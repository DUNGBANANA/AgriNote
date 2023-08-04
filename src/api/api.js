// const URL = "http://eyecheck.vn/AgriNoteAPIs"
const URL = "http://1.55.212.49:5555/AgriNoteAPIs"

export const apiList = {
    //User: 
    login: URL  + "/user/login", //OK
    signUp: URL + "/user/signup", //OK
    getProfile: URL + "/user/getmyprofile", //ok
    updateProfile: URL + "/user/updatemyprofile",
    //Qr:
    getQr: URL + "/qr/getqrinfo", 
    getBatchInfo: URL + "/batch/getbatchinfo",

    //Common
    feedBack: URL + "/feedback/createfeedback", //ok

    //bat thuong 
    sendRP: URL + "/qr/abnormalreport",

    //Notify
    listNotify : URL + "/qr/listActiveJobInComing",

    //Worker
    listActiveJob: URL + '/qr/listmyactivejob',
    getAllCalendar: URL + "/process/getjobcalendar",
    doChecklist: URL + "/",
    listMyLot: URL + "/lot/listmylot",
    listKhuVuc: URL + "/qr/listmyactivegrowableobject",
    setDoneJob: URL + "/qr/setdonejob",
    createLot: URL + "/lot/createlot",
    listLotByObj: URL + '/lot/listmylotbyobject',
    listHistoryWorker: URL +"/qr/gethistoryofworker",

    //ADmin/supervisor
    listLot: URL + "/lot/listlotbyobjectsupervisor",
    listChecklistPlot: URL + "/mngtobj/getDiaryOfObject",
    listGrowableObj: URL + "/qr/listgrowableobject",
    getTree : URL + '/mngtobj/getmngtobjtree',
    getReportDetails: URL + "/mngtobj/getmngtobjdetail",
    listBatch : URL + "/batch/listbatch",
    listAbnormalRP:  URL +"/qr/listabnormalreport",
    listHistory: URL +"/qr/listchecklisthistory",
    updateStateThuHoach: URL + "/mngtobj/updateharveststate",
    createPlot: URL + "/mngtobj/createnewplot",
    delPlot: URL + "/mngtobj/deleteplot",
    chartAbnormal: URL + "/qr/listabnormalreportbytime",
    chartRP: URL+  "/qr/getReportListJobByObject",
    listNotifyRP: URL + "/qr/listabnormalreportNotification"
}