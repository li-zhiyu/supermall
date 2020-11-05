<template>
    <div>
        <nav-bar class="home-nav">
            <div slot="center">精选</div>
        </nav-bar>
        <h1>home</h1>
    </div>
</template>

<script>
    import NavBar from "../../components/common/navbar/NavBar";
    export default {
        name: "home",
        components: {NavBar}
    }
</script>

<style scoped>
.home-nav {
    background-color: #ff8198;
}
</style>