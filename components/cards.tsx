import Image from "next/image";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addToCard } from "../store/shopslice";

type Props = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};

const Cards = ({
  description,
  id,
  image,
  price,
  rating,
  title,
}: Props) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => state.value);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <div className="img">
        <Image
          alt="green iguana"
          layout="fill"
          objectFit="contain"
          src={image}
        />
      </div>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <div className="info">
          <div>{rating.rate}</div>
          <Rating
            name="half-rating-read"
            defaultValue={rating.rate}
            precision={0.1}
            readOnly
          />
          <div>{rating.count + " votes"}</div>
        </div>
      </CardContent>
      <CardActions className="btns">
        <div className="price">
          {price} <span>$</span>
        </div>
        <IconButton
          color="primary"
          onClick={() => dispatch(addToCard({ id, image, price, title }))}
        >
          <ShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Cards;
