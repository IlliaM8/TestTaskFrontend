<template>
  <div class="table_container">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(colm, index) in columns" :key="colm" @click="sort(index)">
            {{ colm }}
          </th>
        </tr>
      </thead>
      <tbody>
        <transition name="loader-anim">
          <my-loader v-if="isLoadingU || isLoadingE" />
        </transition>
        <transition-group name="row-animation">
          <tr v-for="(user, index) in users" :key="index">
            <td v-if="type === 'users'">
              <router-link :to="`user/${user[user.length - 1]}`">
                <p class="username">{{ user[0] }}</p>
              </router-link>
            </td>
            <td v-if="type === 'events'">
              <p>{{ user[0] }}</p>
            </td>
            <td v-for="(item, index) in user.length - 2" :key="index">
              {{ user[1 + index] }}
            </td>
          </tr>
        </transition-group>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "my-table",
  data() {
    return {
      sortIndex: null,
      direction: null,
    };
  },
  props: {
    users: { type: Object, requred: true },
    columns: { type: Array, default: () => [], requred: true },
    type: { type: String },
    method: { type: Function },
  },
  computed: {
    ...mapState({
      isLoadingU: (state) => state.users.isLoading,
      isLoadingE: (state) => state.event.isLoading,
    }),
  },
  methods: {
    sort(index) {
      if (this.sortIndex === index) {
        switch (this.direction) {
          case null:
            this.direction = "up";
            break;
          case "up":
            this.direction = "down";
            break;
          case "down":
            this.direction = "up";
            break;
          default:
            break;
        }
      }

      this.sortIndex = index;

      this.method(
        this.users.sort((rowA, rowB) => {
          if (this.direction === "up") {
            if (typeof rowA[index] === "number") {
              return rowA[index] - rowB[index];
            }

            if (typeof rowA[index] === "string") {
              return rowA[index].localeCompare(rowB[index]);
            }
          } else {
            if (typeof rowA[index] === "number") {
              return rowB[index] - rowA[index];
            }

            if (typeof rowA[index] === "string") {
              return rowB[index].localeCompare(rowA[index]);
            }
          }
        })
      );
    },
  },
};
</script>
<style scoped>
.table_container {
  width: 80%;
  margin: 0 auto;
  padding-top: 10px;
  margin-bottom: 10px;
  position: relative;
}

.table {
  width: 100%;

  border-spacing: 0;
}

.table th {
  background: #fff;
  padding: 8px 10px;
  border-bottom: 1px solid #1a1a1a;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
  font-size: 17px;
}

/* .table th.up {
  background-image: url("./images/up_arrow.png");
}
.table th.down {
  background-image: url("./images/down_arrow.png");
}
.table th.default {
  background-image: url("./images/default.png");
} */
/* th.up,
th.default,
th.down {
  cursor: pointer;
  background-repeat: no-repeat;
  background-position: center right;
} */

.table td {
  border-top: 1px solid #ddd;
  padding: 8px 20px;
}
.table tbody {
  color: rgb(52, 52, 52);
}
.table tbody tr:first-child td {
  border-top: none;
}

.table tbody tr:nth-child(n) td {
  background: #eff0f0;
}
.username {
  color: #373636;
  font-weight: 700;
}
.username:hover {
  text-decoration: underline;
}

.table tbody tr:nth-child(2n) td {
  background: #fff;
}

.row-animation-enter-active,
.row-animation-leave-active {
  transition: all 0.5s ease;
}
.row-animation-enter-from,
.row-animation-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.loader-anim-enter-active,
.loader-anim-leave-active {
  transition: opacity 0.5s ease;
}

.loader-anim-enter-from,
.loader-anim-leave-to {
  opacity: 0;
}
</style>
