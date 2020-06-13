import React from "react";
import Router from "./router";
import "antd/dist/antd.css";
import './commons/styles/common.css';
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import * as Translation from "./commons/Translation";

const messages = {
  vi: Translation.messagesVi,
  en: Translation.messagesEn,
};

function App(props) {
  const { lang } = props;
  return (
    <IntlProvider locale={lang} messages={messages[lang]} key={lang}>
      <Router />
    </IntlProvider>
  );
}

const mapStateToProps = state => ({
  lang: state.userReducer.lang,
});

const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(App);
