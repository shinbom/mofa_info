<template>
    <main>
        <searchBar></searchBar>
        <notice></notice>
    </main>
</template>

<script>
import searchBar from '../components/searchBar.vue';
import notice from '../components/Notice.vue';

export default {
    name : 'Main',
    components : {
        searchBar,
        notice
    },
}
</script>

<style lang="scss">
    main{
        min-height:calc(100vh - 90px);
        padding:50px 0;
        background-color:#f2f4f6;
    }
</style>