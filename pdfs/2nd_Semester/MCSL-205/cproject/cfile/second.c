#include <stdio.h>
int main(){
    int num, n, i;
    int even_sum = 0;
    int odd_sum = 0;

    printf("Enter the number of elements: ");
    scanf("%d", &n);

    for (i=1; i <= n; i++){
        printf("Enter The number %d: ", i);
        scanf("%d", &num);
        if (num % 2 == 0) {
            even_sum += num;
        } else {
            odd_sum += num;
        }
    }
    printf("the even_sum %d, odd_sum %d \n", even_sum, odd_sum);
    return 0;
}
