const initState = {
    menuItemText:"首页",
    demo:"今天周六"
}

export default (state = initState,action)=>{
    switch(action.type){
        case "CHANGE_MENU_ITEM":
            return {
                ...state,
                menuItemText:action.text
            }
        default:
            return state
    }
}