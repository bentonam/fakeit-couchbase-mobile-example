// register highlight.js vue component
Vue.use(VueHighlightJS)

// create local ecommerce database
var db = new PouchDB('local_ecommerce', {
  auto_compaction: true,
  revs_limit: 3
});
var remote_db = new PouchDB('http://localhost:4984/ecommerce/', {
  auth: {
    username: 'Testing',
    password: 'testing'
  },
  skip_setup: true
});
// merge remote database with local database
PouchDB.sync(db, remote_db, { live: true, retry: true })



var app = new Vue({
  el: '#app',
  data: {
    current_type: '',
    items: [],
    id: '',
    current: JSON.stringify({}),
    types: [],
  },
  watch: {
    id(id) {
      if (id) {
        db.get(id).then((current) => this.current = JSON.stringify(current, null, 2))
      }
    },
    current_type(type) {
      this.id = ''
      // update the current item to be blank
      this.current = JSON.stringify({})

      // when `current_type` changes update the items list with the current types list
      this.updateItems(type)
        .then(() => {
          if (!this.id) {
            this.id = this.items[0]
          }
        })
    }
  },
  methods: {
    updateItems(type) {
      return db.query('ecommerce/by_doc_type', { key: type, reduce: false })
        .then((result) => {
          this.items = result.rows.map((item) => item.id)
        })
    },
    removeStyle(el) {
      setTimeout(() => {
        el.style = ''
      }, 1000)
    }
  },
  created() {
    // create the view to be queried
    var ddoc = {
      _id: '_design/ecommerce',
      views: {
        by_doc_type: {
          map: function(doc) {
            if (doc.doc_type) {
              emit(doc.doc_type);
            }
          }.toString(),
          reduce: '_count'
        }
      }
    }


    db.put(ddoc)
      // design document created
      // call the design document view index immediately to trigger a build
      .then(() => db.query('ecommerce/by_doc_type', { limit: 0 }))
      .catch((err) => { // it is fine if this fails and returns a document conflict that just means it doesnt need to be created
        if (err.status !== 409) {
          throw err;
        }
      })

      // get all of the doc types available
      .then(() => db.query('ecommerce/by_doc_type', { reduce: true, group: true }))
      .then((types) => {
        this.types = types.rows.map((type) => type.key)
        this.current_type = this.types[0]
      })
  }
})