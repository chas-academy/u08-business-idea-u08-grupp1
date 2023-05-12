import { produce } from "immer";
import { create } from "zustand";

export const useStore = create((set) => ({
    variable: "", //add more variables after commas
    setVariable: (string:string) => //used like this: setVariable("the string you want to send in")
        set(
            produce((state) => {
                state.variable = string; //sets the value of "variable" to the input string
            })
        )
}))

//to import the store to another file:
//add 'import { useStore } from "../store/useStore";'
//access the variables and set function like this: 'const [variable, setVariable] = useStore((state:any) => [state.variable, state.setVariable]);'