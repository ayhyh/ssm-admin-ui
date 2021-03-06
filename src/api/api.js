import axios from 'axios';
import Vue from 'vue';
// let base = 'http://192.168.199.159:8080';

// let base = 'http:/47.107.178.240:8080';
let base = 'http://127.0.0.1:8080';

axios.defaults.withCredentials = true;
//login
export const baseUrl = () => {
    return base;

};
export const login = params => {
    return axios.post(`${base}/ssm/user/permlogin`, params).then(res => res.data);

};
export const tmp_login = params => {
    return axios.post(`${base}/ssm/user/tmplogin`, params).then(res => res.data);

};
export const auth_code = () => {
    return axios.get(`${base}/ssm/authcode` ,{
        responseType: "arraybuffer",
    } ).then(res => res.data);

};
// 全局设置token
axios.interceptors.request.use(
    config => {

        if(sessionStorage.getItem('user') == undefined){
            return config;

        }else {
            config.headers.token = JSON.parse(sessionStorage.getItem('user')).token;
            return config;
        }




    },
    error=>{

        Vue.prototype.vm.$message({
            message:error.response.status,
            type:'error'
          })
          console.log(111)
        return Promise.reject(error);
      })
//respon拦截器
axios.interceptors.response.use(
  response=>{
      console.log(response);
    if(response.data.code=='401' || response.status=="401" ){
      Vue.prototype.vm.$message({
        message:'无权限',
        type:'error'
      })
    }
    // if(response.data.code=='400'|| response.status=="400"){
    //   Vue.prototype.vm.$message({
    //     message:'系统繁忙',
    //     type:'error'
    //   })
    // }
    if(response.data.code=='405'|| response.status=="405"){
        Vue.prototype.vm.$message({
          message:'系统繁忙',
          type:'error'
        })
      }
      if(response.data.code=='404'|| response.status=="404"){
        Vue.prototype.vm.$message({
          message:'网页未找到',
          type:'error'
        })
      }

    return response
  },
  error=>{
    Vue.prototype.vm.$message({
        message:"无权限",
        type:'error'
      })
      console.log(Vue.prototype.vm.$message)
    return Promise.reject(error);
  }
)
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//student
export const get_students_by_grade = id => {
  return axios.get(`${base}/ssm/student/grade/${id}`).then(res => res.data);

};
export const get_students_by_class = id => {
    return axios.get(`${base}/ssm/student/class/${id}`).then(res => res.data);

};
export const get_students_by_school = id => {
    return axios.get(`${base}/ssm/student/company/${id}`).then(res => res.data);

};

export const add_student = params => {
  return axios.post(`${base}/ssm/student`, params).then(res => res.data).catch(error => error);

};
export const dec_student = id => {
  return axios.delete(`${base}/ssm/student/${id}`).then(res => res.data).catch(error => error);

};
export const update_student = params => {
  return axios.put(`${base}/ssm/student`, params).then(res => res.data).catch(error => error);

};
export const del_students = params => {
    return axios.post(`${base}/ssm/student/batch`, params).then(res => res.data).catch(error => error);

};
export const ser_student_by_name = params => {
    return axios.post(`${base}/ssm/student/fuzzy`, params).then(res => res.data).catch(error => error);

};




export const ser_student_bynumber = params => {
  return axios.post(`${base}/ssm/student/listByNumber`, params).then(res => res.data).catch(error => error);

};

//class

export const get_classes_list = id => {
  return axios.get(`${base}/ssm/class/company/${id}`).then(res => res.data).catch(error => error);

};
export const ser_classes_by_grade = id => {
  return axios.get(`${base}/ssm/class/grade/${id}`).then(res => res.data).catch(error => error);

};
export const add_class = params => {
  return axios.post(`${base}/ssm/class/`, params).then(res => res.data).catch(error => error);

};
export const dec_class = id => {
  return axios.delete(`${base}/ssm/class/${id}`).then(res => res.data).catch(error => error);

};
export const update_class = (params) => {
  return axios.put(`${base}/ssm/class/`, params).then(res => res.data).catch(error => error);

};
export const del_classes = params => {
    return axios.post(`${base}/ssm/class/batch`, params).then(res => res.data).catch(error => error);

};



export const ser_class_by_id = params => {
  return axios.post(`${base}/ssm/Class/listByClassId`, params).then(res => res.data).catch(error => error);

};
//exam
export const exam_list = (id) => {



  return axios.get(`${base}/ssm/exam/maxandmin/${id}`).then(res => res.data).catch(error => error);

};
export const exam_subject_list_by_id = id => {



    return axios.get(`${base}/ssm/exam/details/${id}`).then(res => res.data).catch(error => error);

};
export const add_exam = params => {
  return axios.post(`${base}/ssm/exam/add`, params).then(res => res.data).catch(error => error);

};
export const add_small_exam = params => {
    return axios.post(`${base}/ssm/exam/addsubject`, params).then(res => res.data).catch(error => error);

};
export const  edit_exam = params => {
    return axios.put(`${base}/ssm/exam`,params).then(res => res.data).catch(error =>error);
}

export const  dec_exam = id => {
    return axios.delete(`${base}/ssm/exam/delete/${id}`).then(res => res.data).catch(error =>error);
}
export const add_temple=params=>{
    return axios.post(`${base}/ssm/fragment`,params).then(res=>res.data).catch(error=>error);
}
export const getInfoOfCutting=id=>{
    return axios.get(`${base}/ssm/allInfoCuttingG/${id}`).then(res=>res.data).catch(error=>error);
}
export const get_exam_status=id=>{
    return axios.get(`${base}/ssm/exam/readpaper/status/${id}`).then(res=>res.data).catch(error=>error);
}
export const open_exam=id=>{
    return axios.put(`${base}/ssm/exam/onreadpaper/${id}`).then(res=>res.data).catch(error=>error);
}
export const close_exam=id=>{
    return axios.put(`${base}/ssm/exam/offreadpaper/${id}`).then(res=>res.data).catch(error=>error);
}
export const count_exam_score=id=>{
    return axios.post(`${base}/ssm/exam/scores/${id}`).then(res => res.data).catch(error => error);
}
export const exam_scores=id=>{
    return axios.get(`${base}/ssm/show/exam/scores/${id}`).then(res=>res.data).catch(error=>error);
}
//grade
export const view_grade = id => {
  return axios.get(`${base}/ssm/grade/company/${id}`).then(res => res.data).catch(error => error);

};
export const add_grade = params => {
  return axios.post(`${base}/ssm/grade`, params).then(res => res.data).catch(error => error);

};
export const dec_grade = id => {
  return axios.delete(`${base}/ssm/grade/${id}`).then(res => res.data).catch(error => error);

};
export const update_grade = params => {
  return axios.put(`${base}/ssm/grade`, params).then(res => res.data).catch(error => error);

};
export const batch_remove_grade = params => {
    return axios.post(`${base}/ssm/grade/batch`, params).then(res => res.data).catch(error => error);

};

//company
// export const companys = params => {
//     let id = JSON.parse(sessionStorage.getItem('user')).companyId;
//     return axios.get(`${base}/ssm/company/parent/${id}`, params).then(res => res.data).catch(error => error);
//
// };
export const companys = () => {
    return axios.get(`${base}/ssm/company/headerSchool`).then(res => res.data).catch(error => error);

};
export const dec_company = id => {
    return axios.delete(`${base}/ssm/company/${id}`).then(res => res.data).catch(error => error);

};
export const edit_company = params => {
    return axios.put(`${base}/ssm/company`, params).then(res => res.data).catch(error => error);

};
export const add_company = params => {
    return axios.post(`${base}/ssm/company`, params).then(res => res.data).catch(error => error);

};
export const batch_company = params => {
    return axios.post(`${base}/ssm/company/compbatch`, params).then(res => res.data).catch(error => error);

};
export const get_company = () => {
    return axios.get(`${base}/ssm/company/headerSchool`).then(res => res.data).catch(error => error);

};
export const get_company_by_user = () => {
    return axios.get(`${base}/ssm/company/education`).then(res => res.data).catch(error => error);

};
export const get_company_by_id = (id) => {
    return axios.get(`${base}/ssm/company/all/Userschool/${id}`).then(res => res.data).catch(error => error);

};


//subjects
export const get_subjects_list = params => {
    return axios.get(`${base}/ssm/subject`, params).then(res => res.data).catch(error => error);

};
export const edit_subject = (params,id) => {
    return axios.put(`${base}/ssm/subject/${id}`, params).then(res => res.data).catch(error => error);

};
export const add_subject = params => {
    return axios.post(`${base}/ssm/subject`, params).then(res => res.data).catch(error => error);

};
export const dec_subject = (id) => {
    return axios.delete(`${base}/ssm/subject/${id}`).then(res => res.data).catch(error => error);

};
export const batch_remove_subject = params => {
    return axios.post(`${base}/ssm/subbatch`, params).then(res => res.data).catch(error => error);

};

//task
export const get_task = id => {
    return axios.get(`${base}/ssm/fragment/exam/${id}`).then(res => res.data).catch(error => error);

};
export const get_tmp_user = params => {
    return axios.post(`${base}/ssm/tmpexcel/fragment`,params).then(res => res.data).catch(error => error);

};
//reading

// export const get_cut =() => {
//     return axios.get(`${base}/ssm/cutting`).then(res => res.data).catch(error => error);
//
// };
// export const sub_score =pr => {
//     return axios.post(`${base}/ssm/cuttingscore`,pr).then(res => res.data).catch(error => error);
//
// };
export const get_scores =() => {
    return axios.get(`${base}/ssm/allstuscore/12f00e33de5f4c5f8a875b6422ed2565`).then(res => res.data).catch(error => error);

};
export const get_reading_progress =() => {
    return axios.get(`${base}/ssm/judgeProgress`).then(res => res.data).catch(error => error);

};
export const get_reading_quality =(id) => {
    return axios.get(`${base}/ssm/tempreadquality/${id}`).then(res => res.data).catch(error => error);

};
export const get_back_view =() => {
    return axios.get(`${base}/ssm/judgeReview`).then(res => res.data).catch(error => error);

};
export const get_perm_user = (id)=>{
    return axios.get(`${base}/ssm/permUser/cut/${id}`).then(res=>res.data).catch(erroe=>error);
}




//system
export const get_system_log =(id) => {
    return axios.get(`${base}/ssm/logs?pn=${id}`).then(res => res.data).catch(error => error);

};
export const get_system_log_by_date =(id,params) => {
    return axios.post(`${base}/ssm/logs/between?pn=${id}`,params).then(res => res.data).catch(error => error);

};
export const get_special_log =(ip,page)=>{
    return axios.get(`${base}/ssm/logs/${ip}/${page}`).then(res => res.data).catch(error => error);
}
//system_permission
export const add_system_menu =(params) => {
    return axios.post(`${base}/ssm/menu`,params).then(res => res.data).catch(error => error);

};
export const update_menu =(id,params) => {
    return axios.put(`${base}/ssm/menu/${id}`,params).then(res => res.data).catch(error => error);

};
export const get_cir_menu =() => {
    return axios.get(`${base}/ssm/mengList`).then(res => res.data).catch(error => error);

};
export const get_all_menu =() => {
    return axios.get(`${base}/ssm/allMenu`).then(res => res.data).catch(error => error);

};
export const get_menu_by_id =(id) => {
    return axios.get(`${base}/ssm/menu/${id}`).then(res => res.data).catch(error => error);

};
export const del_menu_by_id =(para) => {
    	    return axios.post(`${base}/ssm/deleteMenu`,para).then(res => res.data).catch(error => error);

};
export const get_menu =() => {
    return axios.get(`${base}/ssm/sidebar`).then(res => res.data).catch(error => error);

};

//role
export const add_role =(params) => {
    return axios.post(`${base}/ssm/role`,params).then(res => res.data).catch(error => error);

};
export const update_role =(id,params) => {
    return axios.put(`${base}/ssm/role/${id}`,params).then(res => res.data).catch(error => error);

};
export const del_role =(id) => {
    return axios.delete(`${base}/ssm/role/${id}`).then(res => res.data).catch(error => error);

};
export const get_all_role =() => {
    return axios.get(`${base}/ssm/allRoles`).then(res => res.data).catch(error => error);

};
export const get_role_menu =(id) => {
    return axios.get(`${base}/ssm/roleMenu/${id}`).then(res => res.data).catch(error => error);

};
export const role_add_menu =(params) => {
    return axios.post(`${base}/ssm/assignMenu`,params).then(res => res.data).catch(error => error);

};
//user
export const add_user =(params) => {
    return axios.post(`${base}/ssm/user/signup`,params).then(res => res.data).catch(error => error);

};
export const get_all_user =(page,id) => {
    return axios.get(`${base}/ssm/User/${id}?curPage=${page}`).then(res => res.data).catch(error => error);

};
// export const get_all_user =(page,id) => {
//     return axios.get(`${base}/ssm/permUser/?curPage=${page}`).then(res => res.data).catch(error => error);
//
// };
export const del_user =(ids) => {
    return axios.delete(`${base}/ssm/permUser/${ids}`).then(res => res.data).catch(error => error);

};
export const get_user_role =(id) => {
    return axios.get(`${base}/ssm/userRole/${id}`).then(res => res.data).catch(error => error);

};
export const ass_user_role =(params) => {
    return axios.post(`${base}/ssm/assignRole`,params).then(res => res.data).catch(error => error);

};

export const get_login_company =() => {
    return axios.get(`${base}/ssm/company/headerSchool`).then(res => res.data).catch(error => error);

};


export const update_user =(id,para) => {
    return axios.put(`${base}/ssm/permUserP/${id}`,para).then(res => res.data).catch(error => error);

};






//upload_template
export const set_template_info =(params) => {
    return axios.post(`${base}/ssm/templet`,params).then(res => res.data).catch(error => error);

};


//process
export const pushselectblockp = (params) =>{
    return axios.post(`${base}/ssm/temselectblockp`, params).then(res => {res.data;return res.data});
}
export const pushselectsubregion = (params) =>{
    return axios.post(`${base}/ssm/templet/select/subregion`, params).then(res=>{res.data;return res.data});
}
export const pushfragmentp = (params) =>{
    return axios.post(`${base}/ssm/fragmentp`, params).then(res => {res.data;return res.data});
}
export const pushpaperheaderp = (params) =>{
    return axios.post(`${base}/ssm/temppaperheaderp`, params).then(res => {res.data;return res.data});
}
export const getpaper= (examid)=>{
    return axios.get(`${base}/ssm/templet/${examid}`).then(res=>res.data)
}
export const getselectblock = (templetId)=>{
    return axios.get(`${base}/ssm/temselectblockg/${templetId}`).then(res=>res.data)
}
export const getselectsubblock = (blockId)=>{
    return axios.get(`${base}/ssm/templet/select/subregion/${blockId}`).then(res=>res.data)
}
export const getpaperhead = (templetId)=>{
    return axios.get(`${base}/ssm/templetpaperheaderg/${templetId}`).then(res=>res.data)
}
export const getfragment = (templetId)=>{
    return axios.get(`${base}/ssm/fragment/${templetId}`).then(res=>res.data)
}
export const edittemppaperhead = (templetId,params)=>{
    return axios.put(`${base}/ssm/temppaperheaderu/${templetId}`,params).then(res=>res.data)
}
export const edittemselectblock = (templetId,params)=>{
    return axios.put(`${base}/ssm/temselectblocku/${templetId}`,params).then(res=>res.data)
}
export const edittemselectsubblock = (params)=>{
    return axios.put(`${base}/ssm/templet/select/subregion`,params).then(res=>res.data);
}
export const edittemfragment = (fragmentid,params)=>{
    return axios.put(`${base}/ssm/fragmentu/${fragmentid}`,params).then(res=>res.data)
}
export const delselect=id=>{
    return axios.delete(`${base}/ssm/temselectblockd/${id}`).then(res=>res.data)
}
export const delselectsub=id=>{
    return axios.delete(`${base}/ssm/templet/select/subregion/${id}`).then(res=>res.data)
}
export const delpaperhead=id=>{
    return axios.delete(`${base}/ssm/paperheaderd/${id}`).then(res=>res.data)
}
export const delfragmen=id=>{
    return axios.delete(`${base}/ssm/fragmentd/${id}`).then(res=>res.data)
}

//student_upload
export const get_proportion = (Id)=>{
    return axios.get(`${base}/ssm/paper/scan/proportion/${Id}`).then(res=>res.data)
}
export const get_unknown_paper = (Id)=>{
    return axios.get(`${base}/ssm/student/notpaper/${Id}`).then(res=>res.data)
}
export const get_all_papers = (Id)=>{
    return axios.get(`${base}/ssm/paper/stunum/${Id}`).then(res=>res.data)
}
//system_dic
export const add_sys_dic = (para)=>{
    return axios.post(`${base}/ssm/dicP`,para).then(res=>res.data)
}
export const get_sys_dics = (Id)=>{
    return axios.get(`${base}/ssm/dicTree`).then(res=>res.data)
}
export const update_sys_dic = (id,params)=>{
    return axios.put(`${base}/ssm/dicP/${id}`,params).then(res=>res.data)
}
export const del_sys_dic=id=>{
    return axios.delete(`${base}/ssm/dicD/${id}`).then(res=>res.data)
}
export const get_sys_dic_by_id=id=>{
    return axios.get(`${base}/ssm/dicG/${id}`).then(res=>res.data)
}


// nzq  进度条
export const get_reading_exam_prograss = id=>{
  return axios.get(`${base}/ssm/judgeCutting/${id}`).then(res=>res.data)
}
//ass_marking
export const get_all_cutting=id=>{
  return axios.get(`${base}/ssm/CuttingAllG/${id}`).then(res=>res.data)
}
export const ass_marking=(para)=>{
  return axios.post(`${base}/ssm/bathcAllotCuttingP/`,para).then(res=>res.data)
}
export const dowd_marking=(id)=>{
  return axios.get(`${base}/ssm/allteacherinfoExecl/${id}`).then(res=>res.data)
}
// 打分板 打分
export const add_paper_score = ( para ) => {
  return axios.post(`${base}/ssm/judgedStuCuttingP`, para).then( res => res.data )
}
export const modify_paper_score = ( para ) => {
  return axios.post(`暂无！`, para).then( res => res.data )
}

//reading_paper
export const get_reading_standard=()=>{
    return axios.get(`${base}/ssm/stuJudgeStandard/`).then(res=>res.data)
}
export const get_reading_papers=(page)=>{
    return axios.get(`${base}/ssm/judgeCutting?pn=${page}`).then(res=>res.data)
}
export const add_label=(para)=>{
    return axios.post(`${base}/ssm/stucutlabelp`,para).then(res=>res.data)
}

export const get_cutreadquality=id=>{
    return axios.get(`${base}/ssm/cutreadquality/${id}`).then(res=>res.data)
}
export const get_judgeProgressDetail=()=>{
    return axios.get(`${base}/ssm/judgeProgress/cut`).then(res=>res.data)
}
export const back_to_tem_teacher=(params)=>{
    return axios.post(`${base}/ssm/repulsepaper`,params).then(res=>res.data)
}
export const get_labels=(id)=>{
    return axios.get(`${base}/ssm/stucutlabelg/${id}`).then(res=>res.data)
}
export const get_papertype=()=>{
    return axios.get(`${base}/ssm/dicpapertype`).then(res=>res.data)
}
export const get_excepapertype=()=>{
    return axios.get(`${base}/ssm//dicexcepapertype`).then(res=>res.data)
}
export const ser_paper=(para)=>{
    return axios.post(`${base}/ssm/stucutp`,para).then(res=>res.data)
}
export const get_postition=()=>{
    return axios.get(`${base}/ssm//nextPackgeNum`).then(res=>res.data)
}



export const getfragmentimg=id=>{
    return axios.get(`${base}/ssm/fragmentimg/${id}`).then(res=>res.data)
}
export const getfragmentbyid=(id)=>{
    return axios.get(`${base}/ssm/fragmentg/${id}`).then(res=>res.data)
}
export const putcuttingTotalSorce=(id,score)=>{
    return axios.put(`${base}/ssm/cuttingTotalSorceP/${id}/${score}`).then(res=>res.data)
}

export const postcuttingScorePoint=(params)=>{
    return axios.post(`${base}/ssm/cuttingScorePointP`,params).then(res=>res.data)
}
export const putcuttingScorePoint=(id,params)=>{
    return axios.put(`${base}/ssm/cuttingScorePointP/${id}`,params).then(res=>res.data)
}
export const getcuttingScorePoint=(id)=>{
    return axios.get(`${base}/ssm/cuttingScorePointG/${id}`).then(res=>res.data)
}
export const delcuttingScorePoint=(id)=>{
    return axios.delete(`${base}/ssm/cuttingScorePointD/${id}`).then(res=>res.data)
}

export const addSelectAnswer=(params)=>{
    return axios.post(`${base}/ssm/templetSelectP`,params).then(res=>res.data)
}
export const updateSelectAnswer=(params,id)=>{
    return axios.put(`${base}/ssm/templetSelectP/${id}`,params).then(res=>res.data)
}
export const delSelectAnswer=(id)=>{
    return axios.delete(`${base}/ssm/templetSelectD/${id}`).then(res=>res.data)
}
export const getSelectAnswer=id=>{
    return axios.get(`${base}/ssm/templetSelectG/${id}`).then(res=>res.data)
}

export const pushcutting=(params)=>{
    return axios.post(`${base}/ssm/cuttingG`,params).then(res=>res.data)
}
export const mergeCutting=(params)=>{
    return axios.post(`${base}/ssm/mergeCuttingP`,params).then(res=>res.data)
}
export const delcutting=(id)=>{
    return axios.delete(`${base}/ssm/cuttingAllinfoD/${id}`).then(res=>res.data)
}
export const getallcutting=(id)=>{
    return axios.get(`${base}/ssm/CuttingAllG/${id}`).then(res=>res.data)
}
export const putcutting=(id,params)=>{
    return axios.put(`${base}/ssm/cuttingP/${id}`,params).then(res=>res.data)
}
