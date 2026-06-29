#include <stdio.h>
int main(){
    int num;
    printf("Enter the Number: ");
    scanf("%d", &num);
    if (num > 0){
        printf("%d = positive\n", num);
    }
    else if (num < 0){
        printf("%d = negative\n", num);
    }
    else {
        printf("ZERO\n");
    }
}
