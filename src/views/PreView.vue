<template lang="">
  <div>
    <h1 class="subtitle-1 grey--text d-flex justify-center">
      <span class="headline font-weight-light">Todo</span>
      <span class="headline">List</span>
    </h1>
    <v-snackbar v-model="snackBar" color="primary" top :timeout="2000">
      <span class="white--text d-flex justify-center pb-2">Task added</span>
      <v-btn text class="d-block mx-auto" right @click.native="snackBar = false"
        >Close</v-btn
      >
    </v-snackbar>
    <v-snackbar v-model="doneTaskAlert" color="success" top :timeout="3000">
      <span class="white--text d-flex justify-center pb-2"
        >All tasks are done</span
      >
      <v-btn
        text
        class="d-block mx-auto"
        right
        @click.native="doneTaskAlert = false"
        >Close</v-btn
      >
    </v-snackbar>
    <v-container class="my-5 mx-auto pa-0">
      <v-layout row class="mb-5">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              depressed
              class="transparent grey--text"
              @click="sortBy('title')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small left>mdi-folder</v-icon>
              <span class="text-capitalize">By project name</span>
            </v-btn>
          </template>
          <span>Sorts projects by title</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              depressed
              class="transparent grey--text"
              @click="sortBy('person')"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon small left>mdi-account</v-icon>
              <span class="text-capitalize">By person</span>
            </v-btn>
          </template>
          <span>Sorts projects by name</span>
        </v-tooltip>
      </v-layout>

      <v-card
        flat
        class="card-bg-color"
        v-for="project in projects"
        :key="project.title"
        :id="project.id"
        :class="{ 'done-task success--text': project.done }"
      >
        <v-layout row wrap :class="`ma-auto pa-3 project ${project.status}`">
          <v-flex xs6 sm4 md5>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs4 sm4 md3>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <div class="mt-3 caption grey--text">Due by</div>
            <div>{{ project.dueBy }}</div>
          </v-flex>
          <v-flex xs12 sm12 md2>
            <div class="d-flex justify-center algin-center mt-5">
              <v-chip id="chip" :class="`white--text ${project.status} caption`"
                >{{ project.status }}
              </v-chip>
            </div>
          </v-flex>
          <!-- remove and check button -->
          <v-flex xs12 class="d-flex justify-center ma-3">
            <v-btn
              :outlined="!project.done"
              color="success"
              fab
              small
              @click="toggleDone(project.id)"
              :class="{ 'success white--text': project.done }"
              :loading="loading"
            >
              <span :class="{ 'success-text': !project.done }"> &#x2714; </span>
            </v-btn>
            <v-btn
              :outlined="!project.done"
              color="error"
              class="ml-2 font-weight-bold"
              fab
              small
              @click="deleteItem(project.id)"
              >&cross;</v-btn
            >
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

      <!-- add project button -->
      <v-layout row wrap class="mt-5 d-flex justify-center">
        <v-flex xs2 sm2 md2 class="d-flex justify-center">
          <v-dialog
            v-model="dialog"
            scrollable
            persistent
            :overlay="false"
            max-width="500px"
            transition="dialog-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                class="animate"
                large
                v-bind="attrs"
                v-on="on"
                @click="clear()"
              >
                Add new task
              </v-btn>
            </template>
            <v-card>
              <v-card-title primary-title class="justify-center grey--text">
                Add new task
              </v-card-title>
              <v-card-text>
                <v-form ref="form" class="px-3">
                  <v-text-field
                    label="Title"
                    prepend-icon="folder"
                    v-model="titleCapitalize"
                    :rules="inputRules"
                  >
                  </v-text-field>
                  <v-text-field
                    label="Person"
                    prepend-icon="mdi-account"
                    v-model="personCapitalize"
                    :rules="inputRules"
                  >
                  </v-text-field>
                  <v-textarea
                    label="Information"
                    prepend-icon="edit"
                    v-model="infoCapitalize"
                    :rules="inputRules"
                  >
                  </v-textarea>

                  <v-col cols="12" sm="6" md="4">
                    <v-menu
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="date"
                          :rules="inputRules"
                          label="Pick date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        no-title
                        scrollable
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-form>
              </v-card-text>

              <v-card-actions class="justify-center">
                <v-btn
                  color="success "
                  text
                  @click="submit()"
                  :loading="loading"
                >
                  Add new task
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "Home-page",
  data() {
    return {
      dialog: false,
      title: "",
      person: "",
      info: "",
      date: "",
      id: "",
      currentDate: "",
      count: 0,
      doneCounter: 0,
      loading: false,
      snackBar: false,
      doneTaskAlert: false,
      done: false,
      inputRules: [(value) => value.length >= 3 || "Fill the input"],
      projects: [],
    };
  },
  computed: {
    titleCapitalize: {
      get: function () {
        return this.title;
      },
      // setter
      set: function (newTitle) {
        if (newTitle.length < 1) {
          this.title = "";
          return;
        }
        this.title = newTitle.replace(/^./, newTitle[0].toUpperCase());
      },
    },
    infoCapitalize: {
      get: function () {
        return this.info;
      },
      // setter
      set: function (newinfo) {
        if (newinfo.length < 1) {
          this.info = "";
          return;
        }
        this.info = newinfo.replace(/^./, newinfo[0].toUpperCase());
      },
    },
    personCapitalize: {
      get: function () {
        return this.person;
      },
      // setter
      set: function (newperson) {
        if (newperson.length < 1) {
          this.person = "";
          return;
        }
        this.person = newperson.replace(/^./, newperson[0].toUpperCase());
      },
    },
  },
  methods: {
    sortBy(item) {
      this.projects.sort((a, b) => (a[item] < b[item] ? -1 : 1));
    },
    clear() {
      this.title = "";
      this.person = "";
      this.info = "";
      this.date = "";
      this.done = false;
    },
    submit() {
      this.id = Math.floor(Math.random() * 100);
      this.projects.push({
        id: this.id,
        title: this.title,
        person: this.person,
        information: this.info,
        dueBy: this.date,
        done: this.done,
        status: "ongoing",
        count: 0,
      });
      if (this.projects.length != 1) {
        for (let i = 0; i < this.projects.length - 1; i++) {
          for (let j = i + 1; j < this.projects.length; j++) {
            if (this.projects[i].id === this.projects[j].id) {
              this.id = Math.floor(Math.random() * 100);
              this.projects[j].id = this.id;
            }
          }
        }
      }
      console.log(this.projects);
      this.checkDate();
      console.log(this.projects);
      this.loading = false;
      this.dialog = false;
      this.snackBar = true;
    },
    checkStatus(elementId) {
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id === elementId) {
          this.projects[i].done = !this.projects[i].done;
          console.log(this.projects[i].done);
          this.projects[i].done
            ? (this.projects[i].status = "complete")
            : (this.projects[i].status = "ongoing");

          this.projects[i].done
            ? this.projects[i].count++
            : this.projects[i].count--;
          console.log("add item: " + this.projects[i].count);
        }
      }
    },
    toggleDone(elementId) {
      this.checkStatus(elementId);
      this.checkDate();
      this.checkDone();
      this.clear();
    },
    getCurrentDate() {
      this.currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    },
    checkDate() {
      console.log("checkDate called");
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].dueBy < this.currentDate) {
          if (this.projects[i].status === "complete") {
            this.projects[i].status === "complete";
          } else {
            this.projects[i].status = "overdue";
          }
        }
      }
    },
    deleteItem(elementId) {
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].id === elementId) {
          this.projects.splice(i, 1);
          this.count--;
          console.log("delete item: " + this.count);
        }
      }
    },
    checkDone() {
      console.log("checkDone called");
      this.doneCounter = 0;
      for (let i = 0; i < this.projects.length; i++) {
        if (this.projects[i].count >= 1) {
          this.doneCounter++;
        }
      }
      if (
        this.doneCounter === this.projects.length &&
        this.projects.length != 0
      ) {
        this.doneTaskAlert = true;
      }
    },
  },

  components: {},
  mounted() {
    this.getCurrentDate();
  },
  watch: {
    currentDate() {
      this.checkDate();
    },
    done() {
      this.checkDone();
    },
  },
};
</script>
<style lang="css">
.project.complete {
  border-left: 4px solid #3cd1c2;
}
.project.ongoing {
  border-left: 4px solid orange;
}
.project.overdue {
  border-left: 4px solid tomato;
}
#chip.v-chip.complete {
  background: #3cd1c2;
  animation: compeleteStatus 0.2s ease-in;
  transform: scale(1);
  transform: rotateX(360deg);
}
#chip.v-chip.ongoing {
  background: orange;
  animation: ongoingStatus 0.35s;
  transform: scale(1);
}
#chip.v-chip.overdue {
  background: tomato;
  animation: overdueStatus 0.4s ease-in;
}
.card-bg-color {
  background-color: lightgray;
  transition: background-color 0.4s;
  animation: translateFromLeft 0.75s forwards;
}
.done-task {
  background-color: #9ff5ec !important;
  transition: background-color 0.4s;
}
.success-text {
  color: #4caf50;
}
.animate {
  animation: ongoingStatus 5s;
  transform: scale(1);
}
@keyframes compeleteStatus {
  0% {
    transform: scale(2.5);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes ongoingStatus {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes overdueStatus {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  50% {
    transform: scaleX(1.5);
  }
  75% {
    transform: scaleX(0.5);
  }
  100% {
    transform: scaleX(1);
    opacity: 1;
  }
}
@keyframes translateFromLeft {
  0% {
    transform: translateX(-200%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
