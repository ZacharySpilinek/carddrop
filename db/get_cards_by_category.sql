SELECT * FROM cards
WHERE relationship = $1 OR relationship = 'neutral'
ORDER BY
  CASE
    WHEN relationship != 'neutral' THEN
      (1)
    ELSE
      (2)
  END;