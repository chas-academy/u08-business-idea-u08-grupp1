import { produce } from "immer";
import { create } from "zustand";

export const useClickedCardStore = create((set) => ({
    id: 0,
    coordinates: {lat: 0, lng: 0},
    setId: (id:number) => 
        set(
            produce((state) => {
                state.id = id; 
            })
        ),
    setCoordinates: (coordinates:{lat:number, lng:number}) => 
        set(
            produce((state) => {
                state.coordinates = coordinates; 
            })
        )
}))