//using HSGameEngine.GameEngine.Logic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using UnityEngine;

/// <summary>
/// 对.Net的扩展
/// </summary>
public static class LibExt
{
	public static int SafeToInt32(this string strNum, int defValue = 0)
	{
        int sign = 1;
        if (!string.IsNullOrEmpty(strNum))
        {
            int result = 0;
            foreach (char c in strNum)
            {
                if (!Char.IsDigit(c))
                {
                    if (result == 0 && c == '-')
                    {
                        sign = -1;
                        continue;
                    }
                    break;
                }
                result = result * 10 + (int)(c - '0');
            }
		    return result * sign;
        }

        return defValue;
	}

    public static long SafeToLong(this string strNum, long defValue = 0)
    {
        long sign = 1;
        if (!string.IsNullOrEmpty(strNum))
        {
            long result = 0;
            foreach (char c in strNum)
            {
                if (!Char.IsDigit(c))
                {
                    if (result == 0 && c == '-')
                    {
                        sign = -1;
                        continue;
                    }
                    break;
                }
                result = result * 10 + (long)(c - '0');
            }
            return result * sign;
        }

        return defValue;
    }

    public static ulong SafeToULong(this string strNum, ulong defValue = 0)
    {
        ulong sign = 1;
        if (!string.IsNullOrEmpty(strNum))
        {
            ulong result = 0;
            foreach (char c in strNum)
            {
                if (!Char.IsDigit(c))
                {
                    if (result == 0 && c == '-')
                    {
                        return 0;
                    }
                    break;
                }
                result = result * 10 + (ulong)(c - '0');
            }
            return result * sign;
        }

        return defValue;
    }

    public static bool IsNullOrEmpty(this string theStr)
    {
        return string.IsNullOrEmpty(theStr);
    }

    public static bool IsNullOrEmpty<T>(this List<T> list)
    {
        return (null == list || list.Count == 0);
    }
}