export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 
                          || 'https://candicode.cf/api';
export const ACCESS_TOKEN = 'accessToken';

export const TOKEN_INDEX = 31;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 20;

export const EMAIL_MAX_LENGTH = 30;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

export const STEP_LENGTH = 4;

export const LANGUAGE_SET = [
  'java',
  'python',
  'cpp',
  'javascript',
]

export const LEVEL_SET = [
  'Easy',
  'Moderate',
  'Hard'
]

export const MODULE_SET = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean'],
    [{ 'align': [] }],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}

export const FORMAT_SET = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video',
  'align'
]

export const TAG_SET = [
  'Algorithm', 'SQL', 'Complexity', 'OOP', 'Network',
  'Data structure', 'Database', 'DBMS', 'AI', 'System',
]

const TAG_COLOR_SET = [
  'magenta', 'red', 'volcano', 'orange', 'gold',
  'lime', 'green', 'cyan', 'blue', 'geekblue',
  'purple',
]

export const TESTCASE_FORMAT_SET = [
  'float', 'float_list',
  'integer', 'integer_list',
  'string', 'string_list',
  'boolean', 'boolean_list',
  'x2', 'x3',
]

export function randomColor() {
  var index = Math.floor(Math.random() * TAG_COLOR_SET.length);
  return TAG_COLOR_SET[index];
}

const BANNER_SET = [
  'https://images.idgesg.net/images/article/2019/03/javaworld_jvm_jdk_jre_explainer_java_development_kit_write_3x2_2400x1600_by_idg_oracle_vasabii_gettyimages-100790551-large.jpg',
  'https://miro.medium.com/max/2560/1*iu5XZBn-sR0qjEkvdD93kw.jpeg',
  'https://i.ytimg.com/vi/nqiC6o8vj7o/maxresdefault.jpg',
  'https://previews.123rf.com/images/karpenkoilia/karpenkoilia1709/karpenkoilia170900117/86423976-modern-line-web-concept-for-programming-linear-web-banner-for-coding-.jpg',
  'https://previews.123rf.com/images/vectorlab/vectorlab1609/vectorlab160900093/62507457-coding-and-programming-line-art-thin-vector-icons-set-with-laptop-and-computer-languages.jpg',
  'https://image.freepik.com/free-vector/flat-design-line-concept-banner-seo-coding_145666-623.jpg',
  'https://as1.ftcdn.net/jpg/02/09/90/86/500_F_209908619_pcIfQ4fk1zwBlaL2Bs6gRT0rclY18gVo.jpg',
]

export function randomBanner() {
  var index = Math.floor(Math.random() * BANNER_SET.length);
  return BANNER_SET[index];
}

export function randomNumber() {
  var index = Math.floor(Math.random() * 20);
  return index;
}