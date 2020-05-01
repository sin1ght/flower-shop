<script>
import UserAPI from './api/user'

export default {
    created () {
        UserAPI.login()
    }
}
</script>

<style lang="scss">
div,section,header,footer{
  box-sizing: border-box;
}

</style>
