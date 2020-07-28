import Vue from 'Vue'

class Http{
    static common({url='',method='GET',data={},params={}}={}){
        return Vue.axios({
            url,
            method,
            data,
            params,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
        })
    },
    static Login({username,password}={}){
        return this.common({
            url:'',
            method:'POST',
            data:{username,password}
        })
    }
}