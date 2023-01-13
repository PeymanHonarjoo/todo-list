<template>
  <div
    class="loader-container"
    v-if="start == true"
    :class="{ 'bg-dark-mode': dmData[0].darkmode }"
  >
    <div class="lds-default">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
import { db } from "../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      start: false,
      darkmode: false,
      dmData: [],
    };
  },
  created() {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        onSnapshot(collection(db, user.uid), (querySnapshot) => {
          const fbProjects = [];
          querySnapshot.forEach((doc) => {
            if (doc.id === "dark-mode") {
              const dm = {
                darkmode: doc.data().darkmode,
              };

              fbProjects.push(dm);
            }
          });
          this.dmData = fbProjects;
        });
      } else {
        this.dmData.push({
          darkmode: this.darkmode,
        });
      }
    });

    this.start = true;

    setTimeout(() => {
      this.start = false;
    }, 3000);
  },

  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.start = true;
      }
    };
  },
};
</script>
<style lang="css">
.bg-dark-mode {
  background-color: black !important;
}
.loader-container {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: white;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.lds-default {
  display: inline-block;
  position: relative;
  width: 87px;
  height: 87px;
}
.lds-default div {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #c2185b;
  border-radius: 50%;
  animation: lds-default 1.2s linear infinite;
}
.lds-default div:nth-child(1) {
  animation-delay: 0s;
  top: 37px;
  left: 66px;
}
.lds-default div:nth-child(2) {
  animation-delay: -0.1s;
  top: 22px;
  left: 62px;
}
.lds-default div:nth-child(3) {
  animation-delay: -0.2s;
  top: 11px;
  left: 52px;
}
.lds-default div:nth-child(4) {
  animation-delay: -0.3s;
  top: 7px;
  left: 37px;
}
.lds-default div:nth-child(5) {
  animation-delay: -0.4s;
  top: 11px;
  left: 22px;
}
.lds-default div:nth-child(6) {
  animation-delay: -0.5s;
  top: 22px;
  left: 11px;
}
.lds-default div:nth-child(7) {
  animation-delay: -0.6s;
  top: 37px;
  left: 7px;
}
.lds-default div:nth-child(8) {
  animation-delay: -0.7s;
  top: 52px;
  left: 11px;
}
.lds-default div:nth-child(9) {
  animation-delay: -0.8s;
  top: 62px;
  left: 22px;
}
.lds-default div:nth-child(10) {
  animation-delay: -0.9s;
  top: 66px;
  left: 37px;
}
.lds-default div:nth-child(11) {
  animation-delay: -1s;
  top: 62px;
  left: 52px;
}
.lds-default div:nth-child(12) {
  animation-delay: -1.1s;
  top: 52px;
  left: 62px;
}
@keyframes lds-default {
  0%,
  20%,
  80%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
}
</style>
