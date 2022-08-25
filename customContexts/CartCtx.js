import { createContext ,useState, useMemo } from "react";

import {auth , db} from "../lib/FirebaseConfig";

import {setDoc , doc,getDoc} from "firebase/firestore";

export const UserCartContext = createContext({
    userCart:[],
});

export const UserCartContextProvider = ({children}) => {
    const {currentUser} = auth;

    const [userCart , setUserCart] = useState([]);
    const [userCartLength , setUserCartLength] = useState(0);

    const updateUserDB__HANDLER = (cartArr) => {
        setDoc(doc(db, currentUser.uid , "cart"), {...cartArr}).then(() => {
            console.log("SUCCESSFUL REQUEST!!");
        })
        
    }

    const updateUserCart__HANDLER = async (userCartItem, type) => {
        if(type === "add"){

            setUserCart(prev => {
                let updatedPrevClone = [...prev];
                
                if(prev?.find(prevItem => prevItem.asin === userCartItem.asin)){
                    updatedPrevClone = prev.reduce((acc , prevUserCartItem) => {
                        if(prevUserCartItem.asin === userCartItem.asin){
                            const updatedItemAmount = {...prevUserCartItem, amount: prevUserCartItem.amount + userCartItem.amount };
                            acc.push(updatedItemAmount);
                        } else {
                            acc.push(prevUserCartItem);
                        }

                        return acc;
                    }, []);
                } else {
                    updatedPrevClone.push(userCartItem);
                }
                
                
                if(!!currentUser) updateUserDB__HANDLER(updatedPrevClone);

                const cartLength = updatedPrevClone.reduce((acc, updatedPrevCloneItem) => {
                    acc+=updatedPrevCloneItem.amount;
                    return acc;
                }, 0);

                setUserCartLength(cartLength);
                
                sessionStorage.setItem("userCart" , JSON.stringify([...updatedPrevClone]));
                
                return updatedPrevClone;
            })
            return;
        }
    }

    const updateCartProductAmount__HANDLER = (asin , amount) => {
        setUserCart(prev => {
            const updatedUserCart = prev.map(userCartItem => {
                if(userCartItem.asin === asin){
                    userCartItem.amount = amount;
                }

                return userCartItem;
            });


            const cartLength = updatedUserCart.reduce((acc, updatedPrevCloneItem) => {
                acc+=updatedPrevCloneItem.amount;
                return acc;
            }, 0);

            setUserCartLength(cartLength);

            sessionStorage.setItem("userCart" , JSON.stringify(updatedUserCart));

            if(!!currentUser){
                if(!!currentUser) updateUserDB__HANDLER(updatedUserCart);
            }

            return updatedUserCart;
        });
    }
    
    const deleteCartProduct__HANDLER = (asin) => {
        setUserCart(prev => {
            const updatedUserCart = prev.filter(userCartItem => userCartItem.asin !== asin);
            const cartLength = updatedUserCart.reduce((acc, updatedPrevCloneItem) => {
                acc+=updatedPrevCloneItem.amount;
                return acc;
            }, 0);

            setUserCartLength(cartLength);
            sessionStorage.setItem("userCart" , JSON.stringify(updatedUserCart));

            if(!!currentUser) updateUserDB__HANDLER(updatedUserCart);

            return updatedUserCart;
        });
    }
    
    const cleanUserCartStorage__HANDLER = () => {
        sessionStorage.removeItem("userCart");
        setUserCart([]);
    }

    const userCartFromDB__HANDLER = useMemo(() => async (uid) => {
        const userDocRef = doc(db, uid, "cart");
        const req = await getDoc(userDocRef);

        const userCartData = req.data();

        if(!!userCartData){
            let userCartArr = [];
            for(const id in userCartData){
                userCartArr.push(userCartData[id]);
            }
            
            setUserCart(userCartArr);

            console.log("////////---userCartArr---////////");
            console.log(userCartArr);

            setUserCartLength(() => {
                return userCartArr.reduce((acc, userCartArrItem) => {
                    acc+=userCartArrItem.amount;
                    return acc;
                }, 0)
            });

            sessionStorage.setItem("userCart" , JSON.stringify(userCartArr));
        }
    }, []);

    const userCartFromSS__HANDLER = useMemo(() => () => {
        const userCart_from_SS = sessionStorage.getItem("userCart");

        if(!!userCart_from_SS){
            const _userCart = JSON.parse(userCart_from_SS);

            setUserCart(_userCart);
            setUserCartLength(() => {
                return _userCart.reduce((acc, userCartArrItem) => {
                    acc+=userCartArrItem.amount;
                    return acc;
                }, 0)
            });
        }
    }, []);

    return (
        <UserCartContext.Provider value={{
            updateUserCart__HANDLER,
            updateCartProductAmount__HANDLER,
            deleteCartProduct__HANDLER,
            userCartFromDB__HANDLER,
            userCartFromSS__HANDLER,
            cleanUserCartStorage__HANDLER,
            userCart,
            userCartLength
        }}>
            {children}
        </UserCartContext.Provider>
    )
}