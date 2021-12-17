<template>
  <v-data-table
    class="pl-10 pr-10"
    :headers="headers"
    :items="userList"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User Information 2.0</v-toolbar-title>
        <v-divider class="mx-4" insert vertical></v-divider>

        <v-spacer></v-spacer>


        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            
            <v-btn color="blue-grey" v-bind="attrs" v-on="on">
              <span style="color: white">New</span>
            </v-btn>
            
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.ssn"
                      label="SSN"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="2">
                    <v-subheader>name</v-subheader>
                  </v-col>
                  <v-col cols="10" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.firstName"
                      label="First Name"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="10" sm="5" md="5">
                    <v-text-field
                      v-model="editedItem.lastName"
                      label="Last Name"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.phone"
                      label="Phone Number"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.job"
                      label="Job"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>
              
                <v-row>
                  <v-col cols="15" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.street"
                      label="Street"
                      :readonly="isReadonly"
                    ></v-text-field>
                     <v-text-field
                      v-model="editedItem.city"
                      label="City"
                      :readonly="isReadonly"
                    ></v-text-field>

                    <v-text-field
                      v-model="editedItem.zip"
                      label="Zip Code"
                      :readonly="isReadonly"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn v-if="editMode" color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


      </v-toolbar>
    </template>



    <template v-slot:item.ssn="{ item }">
      <v-chip @click="detailItem(item)" :color="getColor(item.ssn)" dark>
        {{ item.ssn }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "UserInfoList",
  data() {
    return {
      editMode: false,
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: "SSN", value: "ssn" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Phone", value: "phone" },
        { text: "Address Street", value: "street" },
        { text: "City", value: "city" },
        { text: "Zip", value: "zip" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      userList: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      statistics: {},
      }
  },
  created() {
    this.listUserInfo();
  },
  computed: {
    formTitle() {
      return (this.editedIndex === -1 && this.editMode) ? "New User" : (this.editedIndex > -1 && this.editMode) ? "Edit User" : "Detail User";
    },
    isReadonly() {
      return this.editMode ? false : true;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    getColor (calories) {
        if (calories > 400) return 'red'
        else if (calories > 200) return 'orange'
        else return 'green'
      },
    listUserInfo() {
      let userList = [];
      console.log("listUserInfo");

      this.$axios
        .get("/handson/")
        .then((result) => {
          for (let i = 0; i < result.data.length; i++) {
            let userData = {};
            userData["ssn"] = result.data[i].ssn;
            userData["firstName"] = result.data[i].name.firstName;
            userData["lastName"] = result.data[i].name.lastName;
            userData["phone"] = result.data[i].phone;
            userData["street"] = result.data[i].address.street;
            userData["city"] = result.data[i].address.city;
            userData["zip"] = result.data[i].address.zip;
            userData["job"] = result.data[i].job;
            userList.push(userData);
          }
          this.userList = userList;
        });
    },
    detailItem(item) {
      this.editMode = false;
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    editItem(item) {
      this.editMode = true;
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.userList.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.userList.splice(this.editedIndex, 1);

      console.log(this.editedItem);
      this.$axios
          .delete("/handson?ssn="+this.editedItem.ssn)
          .then((result) => {
            console.log(result);
            this.listUserInfo();
          });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      let jsonBody = {};

      jsonBody["ssn"] = this.editedItem.ssn;
      jsonBody["phone"] = this.editedItem.phone;
      jsonBody["address"] = {street: this.editedItem.street, city: this.editedItem.city, zip: this.editedItem.zip};
      jsonBody["name"] = {firstName: this.editedItem.firstName, lastName: this.editedItem.lastName};
      jsonBody["job"] = this.editedItem.job;


      if (this.editedIndex > -1) {
        this.$axios
          .post("/handson/", jsonBody)
          .then((result) => {
            console.log(result);
            //Object.assign(this.shipList[this.editedIndex], this.editedItem);
            this.listUserInfo();


          });
      } else {
        this.$axios
          .post("/handson/", jsonBody)
          .then((result) => {
            console.log(result);
            this.listUserInfo();
            //this.shipList.push(this.editedItem);
          });
      }
      this.close();
    },
  },
};
</script>