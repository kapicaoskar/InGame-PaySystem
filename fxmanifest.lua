fx_version 'adamant'

game 'gta5'

description 'Oskar-PaySystem'
author 'https://github.com/kapicaoskar'
lua54 'yes'
version '1.0'

shared_scripts {
	'@es_extended/imports.lua'
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'config.lua',
	'server/main.lua',
}

client_scripts {
	'config.lua',
	'client/main.lua',
}

ui_pages {
    'html/index.html'
}

files {
    'html/index.html',
    'html/style.css',
    'html/script.js',
}

dependency 'es_extended'