  <template>
  <div v-if="msg" class="alert alert-{{msgtype}}"> {{ msg }} </div>
  <div v-if="selectedTable">
    <div class="row">
        <form id="new-record">
            <div class="form-group">
                <div class="col-sm-9">
                    <label for="newRecord">Insert a document</label>
                    <textarea class="form-control"  rows = 3 placeholder='Enter JSON here' v-model="newRecord"></textarea>
                    <button class="btn btn-default"  @click.prevent="resetRecord">Reset </button>
                    <button class="btn btn-primary" type="submit" @click.prevent="addRecord">Insert</button>
                </div>
                    <div class="col-sm-3" valign='center'>
                    </br>
                    <button class="btn btn-warning" @click.prevent="removeFromVhizr"> Remove from VHiZR </button>
                </div>
            </div>
        </form>
    </div>
    <div v-if="recordCount > 0">
        <h6 align='right'>{{ recordCount }} documents found</h6>
        <h4 v-if="loading"> Loading...</h4>
        <h4 v-if="error"> {{ error }} </h4>
        <table class="table table-striped table-condensed">
            <tr v-for="record in records" track-by="id">
            <td v-if="editRecordId === record.id" class="col-md-10" align='left'><textarea class="form-control" style="min-width: 100%" rows="10" v-model="updateRecord">{{record | json 4 }}</textarea></td>
            <td v-else class="col-md-10" align="left"><pre>{{record | json 4 }}</pre</td>
            <td class="col-md-2">
                <button v-if="editRecordId === record.id" class="btn btn-success" @click.prevent="saveRecord()">Save</button>
                <button v-else class="btn btn-primary" @click.prevent="editRecord(record.id)">Edit </button>
                <button class="btn btn-danger" @click.prevent="removeRecord(record.id)">Delete </button>
            </td>
            </tr>
        </table>
    </div>
    <div v-else>
        <h3> No documents found in table {{ selectedTable }} </h3>
    </div>
  </div>
</template>
<script>
import { hzdb, vhizr } from './hzdb'

export default {
  name: 'Items',
  data () {
    return {
      records: [],
      recordCount: 0,
      loading: false,
      error: '',
      newRecord: '',
      msg: '',
      msgtype: '',
      editRecordId: '',
      updateRecord: {}
    }
  },
  props: {
    selectedTable: {
      type: String,
    }
  },
  computed: {
      recordCount: function() {
          return this.records.length
      }
  },
  watch: {
    'selectedTable': function(newTable, oldTable){
      this.records = []
      this.msg = ''
      this.msgtype = ''
      this.loading = true
      let hztable = hzdb(newTable)
      // Simple autoupdate with subscription to RethinkDB changefeeds, Horizon :)
      hztable.watch().subscribe((docs) => {this.records = docs
                                           this.loading =false },
                                (err) => console.log(err),
                                () => this.loading = false)
    }
  },
  methods: {
      isJson: function (stringtext) {
          try {
              this.error = ''
              this.clearMsg()
              JSON.parse(stringtext)
          } catch(e)
            {
                console.log(e)
                this.error = 'Not a Valid JSON string'
                this.msgtype = 'danger'
                this.msg = e
                return false
            }
          return true
      },
      clearMsg: function() {
        this.msg = ''
        this.msgtype = ''
      },
      addRecord: function() {
          if ( this.isJson(this.newRecord) )
          {
              let newObj = JSON.parse(this.newRecord)
              let hztable = hzdb(this.selectedTable)
              hztable.store(newObj).subscribe( (doc) => { this.msg = "Document Inserted with id: " + doc.id
                                                          this.msgtype = 'success'})
          }
      },
     resetRecord: function() {
         this.clearMsg()
         this.newRecord = ''
     },
     editRecord: function(id){
         this.clearMsg()
         this.editRecordId = id
     },
     saveRecord: function(){
       this.clearMsg()
       let hztable = hzdb(this.selectedTable)
       hztable.replace(this.updateRecord).subscribe((doc) => {this.msg = 'Record '+ doc.id +' updated'
                                                              this.msgtype = 'success'
                                                              this.editRecordId =''},
                                                    (err) => console.log(err))
     },
     removeRecord: function(id){
        this.clearMsg()
         var hztable = hzdb(this.selectedTable)
         hztable.remove(id).subscribe(() => { this.msg = "Doc id " + id + " deleted from collection "+ this.selectedTable
                                              this.msgtype = 'danger' })
     },
     removeFromVhizr: function(){
         this.clearMsg()
         vhizr.find({'table': this.selectedTable}).fetch().subscribe( (doc) => {vhizr.remove(doc.id),
                                                                                console.log('removed ' + id + ' from VHiZR')})
         this.msg = 'Collection ' + this.selectedTable + 'Removed from VH(i)ZR dashboard only, No data was deleted!!'
         this.msgtype = 'success'
     }
    //  removeData: function(){
    //      var confirmation = window.prompt("This Would Delete all documents in the collection " + this.selectedTable + "/n Enter 'Yes' to confirm" + "/n This action is irrevocable");
    //      if (confirmation.toLowercase === 'yes')
    //         this.msg = 'Removed all documents from' this.selectedTable
    //         this.msgtype = ''
    //      else
    //         this.msgtype = 'info'
    //         this.msg = 'Nothing Deleted'
    //  }

  }
}
</script>
