import * as React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { formatCurrency } from '@/utils/format';

interface AmountRangeSliderProps {
    min: number;
    max: number;
    value: [number, number];
    onValueChange: (value: [number, number]) => void;
    currency: string;
}

const AmountRangeSlider: React.FC<AmountRangeSliderProps> = ({
    min,
    max,
    value,
    onValueChange,
    currency
}) => {
    return (
        <div className="w-full space-y-4">
            <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">
                    Amount Range
                </div>
                <div className="text-sm text-gray-500">
                    {formatCurrency(value[0], currency)} - {formatCurrency(value[1], currency)}
                </div>
            </div>
            <Slider.Root
                className="relative flex items-center select-none touch-none w-full h-5"
                value={value}
                onValueChange={onValueChange}
                max={max}
                min={min}
                step={1000}
            >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                    <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb
                    className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Min amount"
                />
                <Slider.Thumb
                    className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Max amount"
                />
            </Slider.Root>
        </div>
    );
};

export default AmountRangeSlider; 