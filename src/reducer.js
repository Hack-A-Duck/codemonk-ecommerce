export const initialState = {
    cart:[],  
    user:null,
    name:null,
    mobile:null,
    pin:null,
    address:null,
    town:null,
    city:null,
    price:0,
    catlist:'',
    product:[]
};



export const getTotal = (cart) => (
    cart?.reduce((tot, item)=> tot + (item.price*item.quant)
    ,0 )
)

let res=0;

const reducer = (state , action) => {
    
    switch(action.type){

        case 'SET_USER':
            return{
                ...state,
                user:action.user
            } ;
        case 'SET_SELLERPRODUCT':
                return{
                    ...state,
                  product:[ ...state.product , action.product ]
                } ;

        case 'SET_PRICE':
            return{
                ...state,
                price:action.price
            } ;

        case 'CAT_CHANGE':
            return{
                ...state,
                catlist:action.catlist
            } ;
            

        case 'SET_ADDRESS':
            return{
                ...state,
                name:action.name,
                mobile:action.mobile,
                pin:action.pin,
                address:action.address,
                town:action.town,
                city:action.city,
            }
            console.log(state);
        
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