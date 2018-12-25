import axios from "axios"
export function formatData(unix){
        function fixedZero(num) {
            return num >= 10 ?num :"0"+num
        }
        let date = new Date(unix)
        var y = fixedZero(date.getFullYear());
        var m = fixedZero(date.getMonth() + 1);
        var d = fixedZero(date.getDate());
        var h = fixedZero(date.getHours());
        var minute = fixedZero(date.getMinutes())
        var s = fixedZero(date.getSeconds());
        
        let timeStr = `${y}-${m}-${d} ${h}:${minute}:${s}`
        return timeStr

    }

    const instance = axios.create({
        baseURL: "https://www.easy-mock.com/mock/5bbb8bf854d6771eb592838d",
        timeout:100000
    })
    const xhr = {
        get(url,data,config){
            return new Promise((resolve,reject)=>{
                instance.get(url, {
                        params: data
                    }, config).then(res => {
                    resolve(res.data)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
    export default xhr