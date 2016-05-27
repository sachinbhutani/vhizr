VH(i)ZR - **V**ueJs, **Hor**i****Z**on **R**ethinkDB Admin demo app
============

This is just a crude database admin demo app using [Horizon] (http://horizon.io/) - A realtime open-sourced backend for realtime apps

Dependencies
* VueJs, Vue-Loader
* Webpack, Webpack-dev-server 
* Horizon
* RethinkDB 

To get the example running on your system 
`git clone this repo into vhizr`
`cd vhizr`
`npm install`
`npm run dev`
`Point your [browser] to [http://localhost:9090] (http://localhost:9090/)` 

The app needs an existing rethinkdb instance to be running. 
If you like VH(i)ZR to run an rethinkdb instance for you 
use `npm run rdev` instead of `npm run dev`

Adding a collection to VH(i)ZR
============
No collection are included in the interface unless explicitly added. 
If a existing collection is added, it's data is available for display and update instantly.
Try adding default user collection **users** 
If the collection does not exist it would be created for you with no data 

Removing a collection to VH(i)ZR
============
To remove a collection from VH(i)ZR, Select the collection from the menu and then click 
"Remove from VH(i)ZR". 
Removing a collection from VH(i)ZR only removed it from the admin interface and 
does not delete data from the collection 

Schemas/Forms??
============
Based on the solution for issues [#138] (https://github.com/rethinkdb/horizon/issues/138) and [#468] (https://github.com/rethinkdb/horizon/issues/468)
I may be able to add schema/validation and automated forms to the interface.
but for now you would need to edit JSON.


TODO
============
* Pagination 
* Authentication and Authorization 
* Permissions
* Schema validation and auto-forms

License: MIT
