Modify line 42 of a file ~/reactNativeTutorials/codeCampSample/node_modules/react-native/local-cli/runIOS/findMatchingSimulator.js

if (!version.match('iOS') && !version.match('tvOS')) {
  continue;
}
instead of
if (!version.startsWith('iOS') && !version.startsWith('tvOS')) {
  continue;
}
