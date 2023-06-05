import { produce } from "immer";
import { create } from "zustand";

export const useClickedCardStore = create((set) => ({
    id: 0, 
    setId: (id:number) => 
        set(
            produce((state) => {
                state.id = id; 
            })
        )
}))