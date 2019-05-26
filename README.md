# chrome-extension-messaging

A messaging library for Google Chrome extensions, originally built for [Kozmos](https://getkozmos.com).

What is it for ?

* Centralizing state and logic in the background
* Sending async calls to background from popup, new tab extensions
* Proxying 3rd-party window messages via content extension, so allowed websites can also access the data

Clients provided:

* Background
* Popup
* Newtab
* ContentMessageProxy

## Install

```bash
$ yarn add azer/chrome-extension-messaging
```
