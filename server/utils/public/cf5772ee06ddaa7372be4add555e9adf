#include "main.h"
/**
 * binary_to_uint - convert a binary number to an unsigned integer
 * @b: string that contains the binary number
 *
 * Return: returns the converted number
 */

unsigned  int binary_to_uint(const char *b)
{
int n;
unsigned int decimalNum = 0;
if (!b)
return (0);
for (n = 0; b[n]; n++)
{
if (b[n] < '0' || b[n] > '1')
return (0);
decimalNum = 2 * decimalNum + (b[n] - '0');
}
return (decimalNum);
}

