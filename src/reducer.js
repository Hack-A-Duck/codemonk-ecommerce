export const initialState = {
    cart:[],
    
};



let res=0;
const reducer = (state , action) => {
    
    switch(action.type){

        case 'SET_USER':
            return{
                ...state,
                user:action.user
            } ;
        
        case 'ADD_PRODUCT':
            return{
                ...state,
                cart:[ ...state.cart , action.product ]
            }

        case 'REMOVE_PRODUCT':
        res= state.cart.findIndex(pr=> {
           return (pr.id== action.id);  
        })
             console.log('brooss',res)
            let newC = [...state.cart];

            if(res!=-1)
            {
                newC.splice(res,1);
            }
            else{console.warn('Cant remove ')};
            return{
                ...state,
                cart:newC
            };


        default:
            return state;
    }
}

export default reducer;