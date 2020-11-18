<template>
<div>
    <h1>welcome {{ username }}</h1>
    <h4>Total sum: {{ totalsum }}</h4>
    <button>Show Total Balance of All users</button>
    <router-link to="allusers"><button>Show all users</button></router-link> 
</div>
    
</template>

<script>
export default {
    
}
</script>