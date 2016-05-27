<template>
  <ul class="nav nav-sidebar">
    <li v-for="table in tables" v-bind:class="isActive(table.table)"><a href="#{{ table.table }}" @click.prevent="selectTable(table.table)">{{ table.table | capitalize }}</a></li>
  </ul>
  <hr>
  <form class="form-inline"  id="new-table">
  <div class="form-group">
    <label for="newTable">Add a Collection</label>
    <div class='input-group'>
    <input class="form-control" text="new-table" v-model="newTable" placeholder="Collection Name"></input>
    <span class="input-group-btn"><button class="btn btn-default" type="submit" @click.prevent="addTable"> + </button></span>
    </div>
  </div>
  </form>
  </ul>
</template>

<script>
import { hzdb, vhizr } from './hzdb'

export default {
  name: 'Tables',
  data () {
    return {
      tables: [],
      newTable: '',
      error: ''
    }
  },
  props: {
    selectedTable: {
      type: String,
      twoWay: true
    }
  },
  attached () {
    // set watch for list of tables when the component is attached for auto updates
    // set this.tables to array returned by watch to use changefeeds! Awesome Horizon!
    vhizr.watch().subscribe((doc) => this.tables = doc,
                             (err) => console.log('error'))
  },
  methods: {
    addTable() {
      let newEntry = {}
      this.error = ''
      newEntry.table = this.newTable.toLowerCase().trim()
      vhizr.store(newEntry).subscribe( (doc) => console.log('Added Collection id :'+ doc.id), (err) => console.log(err), () => this.newTable = '')
    },
   selectTable(selectedTable){
     this.selectedTable = selectedTable
   },
   isActive(selectedTable){
     if (this.selectedTable === selectedTable)
      return 'active'
     else
      return ''
   }
 }
}
</script>
