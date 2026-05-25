class Solution {
    public List<List<Integer>> generate(int numRows) {
        List<List<Integer>> ansFinal = new ArrayList<List<Integer>>();
        for(int i=1; i<=numRows; i++){
            ansFinal.add(generateRow(i));
        }
        return ansFinal;

    }

    public static List<Integer> generateRow(int n){
        List<Integer> ans = new ArrayList<>();
        int res =1;

        ans.add(res);
        for(int i=1; i<n; i++){
            res = res*(n-i);
            res = res/i;
            ans.add(res);
        }
        return ans;
    }
}