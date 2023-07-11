import {render, screen} from "@testing-library/react";
import ClockInput from "../ClockInput";

describe('ClockInput', ()=>{
    it("should render", ()=>{
        render(<ClockInput value={12 * 60 + 34}/>)
        const first = screen.getByText('1');
        const second = screen.getByText('2');
        const third = screen.getByText('3');
        const fourth = screen.getByText('4');
        expect(first).toBeInTheDocument();
        expect(second).toBeInTheDocument();
        expect(third).toBeInTheDocument();
        expect(fourth).toBeInTheDocument();
    })
})