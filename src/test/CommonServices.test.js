import React from "react";
import IsValidEmail from "../services/CommonServices";

test('Email validation test', () =>
{
    const validEmailAddress = 'mysample@gmail.com';
    const invalidEmailAddress1 = 'mysamplegmail.com';
    const invalidEmailAddress2 = 'mysample@gmail';

    expect(IsValidEmail(validEmailAddress)).toBe(true);
    expect(IsValidEmail(invalidEmailAddress1)).toBe(false);
    expect(IsValidEmail(invalidEmailAddress2)).toBe(false);
});
