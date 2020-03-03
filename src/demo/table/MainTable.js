import React from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Button } from "antd";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAllProject,
  getByIp,
  getByProjectName,
  createProject,
  editProjectById,
  deleteProjectById
} from "../../actions/actions.creator";
import "./Table.scss";

const propTypes = {
  getAllProject: PropTypes.func.isRequired,
  getByProjectName: PropTypes.func.isRequired,
  getByIp: PropTypes.func.isRequired,
  projects: PropTypes.array.isRequired
};

const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === "number") {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`
                }
              ],
              initialValue: record[dataIndex]
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return (
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], editingKey: "" };
    this.columns = [
      {
        title: "Project",
        dataIndex: "projectName",
        editable: true,
        width: "45%"
      },
      {
        title: "IP Address",
        dataIndex: "ipAddress",
        editable: true,
        width: "20%"
      },
      {
        title: "Action",
        dataIndex: "operation",
        width: "35%",
        align: "center",
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <Button
                    type="primary"
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </Button>
                )}
              </EditableContext.Consumer>
              <Popconfirm
                title="Sure to cancel?"
                onConfirm={() => this.cancel(record.key)}
              >
                <Button type="primary">Cancel</Button>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <Button
                type="primary"
                disabled={editingKey !== ""}
                onClick={() => this.edit(record.key)}
                icon="edit"
              >
                Edit
              </Button>{" "}
              <EditableContext.Consumer>
                {form => (
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => this.delete(form, record.key)}
                  >
                    <Button type="danger" icon="delete">
                      Delete
                    </Button>
                  </Popconfirm>
                )}
              </EditableContext.Consumer>
            </span>
          );
        }
      }
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: "" });
  };

  delete(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        console.log(error);
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1);
        this.props.deleteProjectById(key).then(res => {
          if (!res) {
            this.setState({ data: newData });
          }
        });
      }
    });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      // clone
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        this.props.editProjectById(key, row).then(res => {
          if (!res) {
            this.setState({ data: newData, editingKey: "" });
          }
        });
      } else {
        newData.push(row);
        this.props.createProject(row).then(res => {
          if (!res) {
            this.setState({ data: newData, editingKey: "" });
          }
        });
      }
    });
  }

  edit(key) {
    this.setState({ editingKey: key });
  }

  componentDidMount() {
    const { props } = this;
    props.getAllProject().then(res => {
      this.setState({ data: res.content });
    });
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (prevProps.projects !== props.projects) {
      this.setState({ data: props.projects });
    }
  }

  render() {
    const components = {
      body: {
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record)
        })
      };
    });

    const data = this.state.data.map(project => ({
      key: project.id,
      projectName: project.projectName,
      ipAddress: project.ipAddress
    }));

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel
          }}
        />
      </EditableContext.Provider>
    );
  }
}

const MainTable = Form.create()(EditableTable);

const mapStateToProps = state => ({
  loading: state.userReducer.loading,
  projects: state.userReducer.projects
});

const mapDispatchToProps = dispatch => ({
  getAllProject: (page, size) => dispatch(getAllProject(page, size)),
  getByProjectName: (name, page, size) =>
    dispatch(getByProjectName(name, page, size)),
  getByIp: (ip, page, size) => dispatch(getByIp(ip, page, size)),
  createProject: payload => dispatch(createProject(payload)),
  editProjectById: (id, payload) => dispatch(editProjectById(id, payload)),
  deleteProjectById: id => dispatch(deleteProjectById(id))
});

MainTable.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(MainTable);
