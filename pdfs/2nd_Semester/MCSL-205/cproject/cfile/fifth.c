#include <stdio.h>
int main(){
    int original_num, num, remainder;
    int sum = 0;
    printf("enter the atleast more than one digit number: ");
    scanf("%d", &original_num);
    num = original_num;
    while (num > 0){
        remainder = num % 10;
        sum += remainder;
        num /= 10;
    }
    printf("The sum of digits of %d is %d\n", original_num, sum);
    return 0;
}
