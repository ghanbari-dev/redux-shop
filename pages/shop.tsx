import { Button } from "@mui/material";
import { NextPage } from "next";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addToCard, removeFromCard } from "../store/shopslice";

const Shop: NextPage = () => {
  const item = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className="shopitems">
      {item.items &&
        item.items.map((element, index) => (
          <div className="pricecard" key={index}>
            <div className="img">
              <Image src={element.image} objectFit="contain" layout="fill" alt="" />
            </div>
            <div>{element.title}</div>
            <div>{element.price}</div>
            <div>{element.quantity}</div>
            <Button
              variant="contained"
              onClick={() => dispatch(addToCard({ ...element }))}
            >
              +
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(removeFromCard({ ...element }))}
            >
              -
            </Button>
          </div>
        ))}
      <div>Total price : {item.value.toFixed(2)} $</div>
    </div>
  );
};

export default Shop;
