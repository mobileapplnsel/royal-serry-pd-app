import Axios, { AxiosError, AxiosResponse } from 'axios'
export default class BaseApi{
    public static BaseURL:string = "https://irpl.biz/royal-serry-dev/"; 
    //public static BaseURL:string = "http://staging-rss.staqo.com/"; 
   // public static BaseURL:string =  "https://api.regtfw.in/public/api/";

    protected static BasePostRequest(url:string,Model:any,callback:any){
        Axios.post(this.BaseURL+url,Model)
        .then(res=>{
            this.TaskSuccess(res,callback);
        })
        .catch(err=>{
            this.TaskFailure(err,callback);
        })
    }

    private static TaskSuccess(res:AxiosResponse,callback:any){
        var r  = res as any;
        // r.IsSuccess = res.data.IsSuccess;
        callback(r);
    }

    public static TaskFailure(err:AxiosError,callback:any){
      var response = err as any;
        // let response = {Data:undefined,IsSuccess:false,Message: err.message,Error:[]};
        // response.Message = err.message;
        callback(response);
    }
}