![Commits](https://img.shields.io/github/commit-activity/y/zmrhaljiri/text-spacing-editor?label=Commits)
![GitHub issues](https://img.shields.io/github/issues/zmrhaljiri/text-spacing-editor)
[![Badge License]](LICENSE.txt)
[![Badge Mozilla]](https://addons.mozilla.org/addon/text-spacing-editor/)
[![Badge Chrome]](https://chrome.google.com/webstore/detail/text-spacing-editor)
[![Badge Edge]](https://microsoftedge.microsoft.com/addons/detail/text-spacing-editor)
[![Badge Safari]](https://apps.apple.com/cz/app/text-spacing-editor)
[![Badge Opera]](https://addons.opera.com/en/extensions/details/text-spacing-editor)


***

<h1 align="center">
    <sub>
        <img src="https://raw.githubusercontent.com/zmrhaljiri/text-spacing-editor/master/icon48.png" height="38" width="38">
    </sub>
    Text Spacing Editor
</h1>

***
<p align="center">
A browser extension that allows you to set custom values for the following text spacing properties: Line height, letter spacing, word spacing, and paragraph spacing.
You can use it also as a way of testing the <a href="https://www.w3.org/WAI/WCAG21/Understanding/text-spacing.html">WCAG success criterion 1.4.12 - Text Spacing</a>.
</p>

***

<p align="center">
<a href="https://addons.mozilla.org/addon/text-spacing-editor/"><img src="https://user-images.githubusercontent.com/585534/107280546-7b9b2a00-6a26-11eb-8f9f-f95932f4bfec.png" alt="Get Text Spacing Editor for Firefox"></a>
<a href="https://chrome.google.com/webstore/detail/text-spacing-editor/amnelgbfbdlfjeaobejkfmjjnmeddaoj"><img src="https://user-images.githubusercontent.com/585534/107280622-91a8ea80-6a26-11eb-8d07-77c548b28665.png" alt="Get Text Spacing Editor for Chromium"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/text-spacing-editor/amnelgbfbdlfjeaobejkfmjjnmeddaoj"><img src="https://user-images.githubusercontent.com/585534/107280673-a5ece780-6a26-11eb-9cc7-9fa9f9f81180.png" alt="Get Text Spacing Editor for Microsoft Edge"></a>
<a href="https://addons.opera.com/extensions/details/text-spacing-editor/"><img src="https://user-images.githubusercontent.com/585534/107280692-ac7b5f00-6a26-11eb-85c7-088926504452.png" alt="Get Text Spacing Editor for Opera"></a>
<a href="https://addons.thunderbird.net/thunderbird/addon/text-spacing-editor/"><img src="https://user-images.githubusercontent.com/124740436/235314672-73243149-3683-4407-a2d5-ad0f2b08bc17.png" alt="Get Text Spacing Editor for Thunderbird"></a>
</p>


***

This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Testing with Android


You can use [web-ext](https://github.com/mozilla/web-ext) to test your build for Android.

Assuming you have your Android device configured with adb and ready to use:

```bash
cd build/target-mvX-ENV # navigate to build target folder

adb devices # copy device name

web-ext run -t firefox-android  --android-device=DEVICE_NAME #use device name from adb
```

## Making production build

Run the following:

```bash
yarn build:all
```

This should create a production bundle for Chrome, Firefox, Safari, Edge and Opera in a `build/` folder. You can then publish zip archives

## Submit to the webstores

Build with plasmo, packed with `pack.sh` script and distributed to web stores manualy.


<!----------------------------------[ Badges ]--------------------------------->
[Badge License]: https://img.shields.io/badge/License-GPLv3-blue.svg
[Badge Chrome]: https://img.shields.io/chrome-web-store/rating/amnelgbfbdlfjeaobejkfmjjnmeddaoj?label=Chrome
[Badge Edge]: https://img.shields.io/badge/dynamic/json?label=Edge&color=brightgreen&query=%24.averageRating&suffix=%2F%35&url=https%3A%2F%2Fmicrosoftedge.microsoft.com%2Faddons%2Fgetproductdetailsbycrxid%2___ADD___ID
[Badge Mozilla]: https://img.shields.io/amo/rating/text-spacing-editor?label=Firefox
[Badge Safari]: https://img.shields.io/amo/rating/text-spacing-editor?label=Safari
[Badge Opera]: https://img.shields.io/amo/rating/text-spacing-editor?label=Opera

