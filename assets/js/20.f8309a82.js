(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{449:function(s,e,a){"use strict";a.r(e);var n=a(36),t=Object(n.a)({},(function(){var s=this,e=s.$createElement,a=s._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"homebrew-注意事项"}},[s._v("homebrew 注意事项")]),s._v(" "),a("h2",{attrs:{id:"带有版本的包"}},[s._v("带有版本的包")]),s._v(" "),a("p",[s._v("homebrew 下载的包带有 version 和不带有 version 不是一个包，比如下载 nodejs：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("brew "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" node@20\n\nbrew "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("node")]),s._v("\n")])])]),a("p",[s._v("上面这个命令只会下载 nodejs 20 版本中的包，brew upgrade 也是一样，不会超过 verison 20 这个大版本，每一个带有 version 的版本都是一个文件夹，内部还有各种的小版本，")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("- node/**\n- node@20/**\n")])])]),a("p",[s._v("如果是下面这个安装方法，就会安装最新的版本")]),s._v(" "),a("p",[s._v("如果使用下面这种方法自动将可执行文件 link 到执行路径，如果是带有版本，由于可以下载很多个版本，所以并不会自动的 link，需要自己手动 link")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("brew "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("link")]),s._v(" --force node@20\n")])])])])}),[],!1,null,null,null);e.default=t.exports}}]);