import { Button } from 'antd';
import React from 'react';

export default function ClearFilter() {
  return (
    <div className="mr-2 mb-4 w-full basis-1/4 md:mr-4 md:mb-0 md:w-36 md:basis-0">
      <Button className="w-full" size="large">
        Clear
      </Button>
    </div>
  );
}
