<template>
  <div id="app">
    <router-link to="/">
      <h1 class="mainText">mar4elkin's anime list</h1>
    </router-link>
    <router-view/>
  </div>
</template>

<style>
      body{
        background-color: #222831;
      }
      .mainText {
        color:#b55400;
        text-align: center;
        font-size: 50px;
    }
</style>
