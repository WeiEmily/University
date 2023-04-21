package CS211Lab9;

public class Knapsack {

    public static int knapsack(int W, int[] wt, int[] val, int n) {
        // create a 2D array to store the maximum value that can be obtained
        // with i items and j capacity
        int[][] dp = new int[n + 1][W + 1];

        // initialize the array with 0
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= W; j++) {
                dp[i][j] = 0;
            }
        }

        // fill the array using dynamic programming
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= W; j++) {
                if (wt[i - 1] <= j) {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - wt[i - 1]] + val[i - 1]);
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }

        // return the maximum value that can be obtained with a knapsack of weight W
        return dp[n][W];
    }

    public static int newKnapsack(int W, int[] wt, int[] val, int n) {

            // create an array to store the maximum value that can be obtained

            int[] dp = new int[W + 1];

            // fill the array using dynamic programming
            for (int j = 1; j <= W; j++) {
                for (int i = 0; i < n; i++) {
                    //after j < wt[i]  just continue
                    if (wt[i] <= j) {
                        //array last one is  dp[j - wt[i]] and add from begining val[i]
                        dp[j] = Math.max(dp[j], dp[j - wt[i]] + val[i]);
                    }
                }
            }
            // return the maximum value that can be obtained with a knapsack of weight W
            return dp[W];
    }

    public static void main(String[] args) {
        //Your code ...
//        int[] values = {34, 43, 52, 38};
//        int[] weights = {10, 20, 30, 40};
//        int W = 90;
//        //n items, each with weight wt[i]
//        int n = weights.length;
//
//        System.out.println("Step 1 What is the expected output: " + knapsack(W, weights, values, n));

        //============================================================================================

        int val[] = { 10, 40, 50, 70 };
        int wt[] = { 1, 3, 4, 5 };
        int W2 = 11;
        int n2 = wt.length;


        System.out.println("Step 2 What is the expected output: " + knapsack(W2, wt, val, n2));
        System.out.println("Step 2 What is the expected output: " + newKnapsack(W2, wt, val, n2));
    }
}