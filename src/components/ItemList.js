import { useGlobalContext } from "../context";

const ItemList = ()=>{
   
    const {itemList,loading,loadMore,isError} = useGlobalContext();
    
    if(loading){
        return <section className="section">
            <h4>Loading Items....</h4>
        </section>
    }
    if(isError){
        return<div>
            <h1 className="text-danger text-center mt-5">
                Error while trying to fetch the items!
            </h1>
            <h5 className="text-primary text-center">
                Try again by refreshing the page!
            </h5>
        </div>
    }

        return<section className="cards">
        {itemList.map((item)=>{
            return<section  key={item.idMeal} className="singleItem">
                <div className="card">
                    <div className="card-title">
                       <h3>{item.idMeal}: {item.strMeal}</h3>
                    </div>
                    <div className="card-body">
                        {item.strInstructions}
                    </div>
                </div>
            </section>
        })}
        <div className="ps-3 mt-3 mb-3">
            <button className="btn btn-primary" onClick={loadMore}>
                Load More
            </button>
        </div>
        
    </section>
}
export default ItemList;