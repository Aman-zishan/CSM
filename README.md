
![csm logo](https://github.com/Aman-zishan/CSM/assets/55238388/18961d71-e87d-4e53-939b-2238c60a09d1)

<div align="center">


  ![CLI](https://github.com/aleen42/badges/blob/master/src/cli.svg)
  ![npm](https://github.com/aleen42/badges/blob/master/src/npm.svg)
  ![node](https://github.com/aleen42/badges/blob/master/src/node.svg)
  ![typescript](https://github.com/aleen42/badges/blob/master/src/typescript.svg)
  ![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/Aman-zishan/CSM/publish.yml)
  ![npm](https://img.shields.io/npm/dw/csm-kit)
  ![GitHub License](https://img.shields.io/github/license/Aman-zishan/csm)
  ![npm](https://img.shields.io/npm/v/csm-kit)

</div>

CSM is a CLI tool build in typescript to store your code snippets. Create and access your code snippets with the
command line interface. Search through the saved code snippets to have a quick look.

</br>

## installation

```bash

npm install -g csm-kit
```



## Text User Interface

<div align="center">

![csm](https://github.com/Aman-zishan/CSM/assets/55238388/b08503f7-087b-47ae-9cc5-6d4d75350a05)

</div>

launch the interface

```bash
csm-kit -l
```


### Key Bindings
<br />

| Action | Key |
| :--- | :--- |
| Copy selected snippet to clipboard | <kbd>c</kbd> |
| Delete selected snippet | <kbd>d</kbd> |
| Search for snippets | <kbd>/</kbd> |
| move up/down the list | <kbd>↑</kbd> <kbd>↓</kbd> |
| select snippet | <kbd>enter</kbd> |
| Go back (exit from search) | <kbd>esc</kbd> |
| Quit application | <kbd>q</kbd> <kbd>ctrl+c</kbd> |




## Command Line Interface

```bash
# help command
csm-kit -h

# save a new snippet
csm-kit -s <filepath>

# example:

csm-kit -s hello.py

# list all snippets
csm-kit -ls

# get a snippet by name
csm-kit -o <snippet_title>

## format for snippet name : binary_search_in_py should be seperated by underscore like this

# example
csm-kit -o binary_search_in_py

# delete a snippet
csm-kit -d <snippet_ID>

# example
csm-kit -d 2
```





