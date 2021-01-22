<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<style lang="scss" scopd>
*{
  margin: 0;
  padding: 0;
}
.app{
  /* overflow-y: hidden; */
}

html:-moz-full-screen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}

html:-webkit-full-screen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}

html:fullscreen {
  .home {
    width: 100vw;
    height: 100vh;
  }
}

</style>
