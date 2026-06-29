#include <stdio.h>
int main(){
    int dec, original_dec, rem;
    long long binary = 0;
    long long place = 1; // used for to reverse the rem mathematically tricks.

    printf("Enter the Decimal Number: ");
    scanf("%d", &dec);

    original_dec = dec;

    if (dec == 0){
        printf("Binary equivalent of 0 is 0.\n");
    }

    while (dec > 0){
        rem = dec % 2;
        binary = binary + (rem * place);
        place *= 10;
        dec /= 2;
    }
    printf("Binary Equvialent of %d is %lld.\n", original_dec, binary);
    return 0;
}
