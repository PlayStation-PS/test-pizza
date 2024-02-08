import React, { useState } from "react";
import {
    Container,
    Grid,
    Typography,
    Card,
    CardMedia,
    CardContent,
    Radio,
    FormControl,
    RadioGroup,
    FormControlLabel,
    FormGroup,
    Checkbox
} from "@mui/material";

import Img1 from '../assets/img1.jpg';
import Img2 from '../assets/img2.jpg';
import Img3 from '../assets/img3.jpg';

const dataPizza = [
    {
        name: 'Pizza 1',
        price: 8,
        img: Img1
    },
    {
        name: 'Pizza 2',
        price: 10,
        img: Img2
    },
    {
        name: 'Pizza 3',
        price: 12,
        img: Img3
    }
];

const dataSize = [
    { name: 'Small', price: 1 },
    { name: 'Medium', price: 1.5 },
    { name: 'Lagre', price: 2 }
]

const dataToppings = [
    { name: 'Avocado', price: 1 },
    { name: 'Broccoli', price: 1 },
    { name: 'Onions', price: 1 },
    { name: 'Zucchini', price: 1 },
    { name: 'Lobster', price: 2 },
    { name: 'Oyster', price: 2 },
    { name: 'Salmon', price: 2 },
    { name: 'Tuna', price: 2 },
    { name: 'Bacon', price: 3 },
    { name: 'Duck', price: 3 },
    { name: 'Ham', price: 3 },
    { name: 'Sausage', price: 3 }
];

export default function Home() {
    const [selectedPizza, setSelectedPizza] = useState<string | null>(null);
    const [selectedSize, setSelectedSize] = useState<string | null>('small');
    const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

    const handlePizzaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPizza(e.target.value);
        setSelectedToppings([]);
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedSize(e.target.value);
    };

    const handleToppingChange = (topping: string) => {
        const index = selectedToppings.indexOf(topping);
        if (index === -1) {
            setSelectedToppings([...selectedToppings, topping]);
        } else {
            const updatedToppings = [...selectedToppings];
            updatedToppings.splice(index, 1);
            setSelectedToppings(updatedToppings);
        }
    };

    const getAvailableToppings = (): string[] => {
        if (!selectedPizza) {
            return [];
        }

        switch (selectedPizza) {
            case 'Pizza 1':
                return ['Avocado', 'Broccoli', 'Onions', 'Zucchini', 'Tuna', 'Ham'];
            case 'Pizza 2':
                return ['Broccoli', 'Onions', 'Zucchini', 'Lobster', 'Oyster', 'Salmon', 'Bacon', 'Ham'];
            case 'Pizza 3':
                return ['Broccoli', 'Onions', 'Zucchini', 'Tuna', 'Bacon', 'Duck', 'Ham', 'Sausage'];
            default:
                return [];
        }
    };

    const calculateTotalPrice = (): number => {
        const pizza = dataPizza.find(p => p.name === selectedPizza);
        const size = dataSize.find(s => s.name.toLowerCase() === selectedSize);

        if (!pizza || !size) return 0;

        const sizeMultiplier = size && size.price !== undefined ? size.price : 1;

        const toppingsPrice = selectedToppings.reduce(
            (total, topping) => total + (dataToppings.find(t => t.name === topping) ? dataToppings.find(t => t.name === topping)!.price : 0),
            0
        );


        return pizza.price + toppingsPrice + sizeMultiplier;
    };

    const availableToppings = getAvailableToppings();
    const totalPrice = calculateTotalPrice();

    return (
        <>
            <Container>
                {/* Pizza */}
                <h1>Pizza</h1>
                <Grid container spacing={2}>
                    {dataPizza.map((d, i) => (
                        <Grid item xs={4} key={i}>
                            <Card>
                                <CardMedia component="img" height="140" image={d.img} alt={d.name} />
                                <CardContent>
                                    <Typography variant="body2" color="text.secondary">
                                        {d.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        $ {d.price}
                                    </Typography>
                                    <div style={{ textAlign: 'center', paddingTop: 5 }}>
                                        <FormControl>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-form-control-label-placement"
                                                name="pizza"
                                                defaultValue="top"
                                                onChange={handlePizzaChange}
                                            >
                                                <Radio
                                                    checked={selectedPizza === d.name}
                                                    onChange={handlePizzaChange}
                                                    value={d.name}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Size */}
                <h1>Size</h1>
                <FormControl>
                    <RadioGroup
                        row
                        onChange={handleSizeChange}
                        defaultValue={'small'}
                    >
                        {dataSize.map((size, index) => (
                            <FormControlLabel
                                key={index}
                                value={size.name.toLowerCase()}
                                control={<Radio />}
                                label={size.name}
                                labelPlacement="bottom"
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                {/* Toppings */}
                <h1>Toppings</h1>
                <Grid container spacing={2}>
                    {dataToppings.map((d, i) => (
                        <Grid item key={i} xs={3}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label={d.name}
                                    disabled={!availableToppings.includes(d.name)}
                                    checked={selectedToppings.includes(d.name)}
                                    onChange={() => handleToppingChange(d.name)}
                                />
                            </FormGroup>
                        </Grid>
                    ))}
                </Grid>

                {/* Price */}
                <h1>Price</h1>
                <div style={{ marginLeft: 30 }}>
                    <h2>$ {totalPrice.toFixed(2)}</h2>
                </div>
            </Container>
        </>
    );
}
