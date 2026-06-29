#include <stdio.h>
int main(){
    int num;
    printf("Enter the number: ");
    scanf("%d", &num);
    if (num % 7 == 0){
        printf("divisible\n");
    } else {
        printf("Not divisble \n");
    }
    return 0;
}
